import { NextResponse } from 'next/server';
import prettier from 'prettier';

// 禁用静态生成
export const dynamic = 'force-dynamic';

const API_CONFIG = {
  AI_API_URL: process.env.AI_API_URL,
  AI_MODEL: process.env.AI_MODEL,
  API_KEY: process.env.API_KEY
};

// 格式化代码
async function formatCode(code: string): Promise<string> {
  try {
    const formattedCode = await prettier.format(code, {
      parser: 'babel',
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
      printWidth: 80,
      tabWidth: 2,
    });
    return formattedCode.trim();
  } catch (error) {
    console.error('Error formatting code:', error);
    return code; // 如果格式化失败，返回原始代码
  }
}

// 解析 AI 返回的内容
function parseAIResponse(content: string): any {
  try {
    // 首先尝试直接解析为 JSON
    try {
      const directJson = JSON.parse(content);
      if (directJson.poem && directJson.code) {
        return directJson;
      }
    } catch (e) {
      // 如果直接解析失败，继续尝试其他方式
    }

    // 尝试从 Markdown 代码块中提取
    const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      const markdownJson = JSON.parse(jsonMatch[1]);
      if (markdownJson.poem && markdownJson.code) {
        return markdownJson;
      }
    }

    // 如果都失败了，返回 null
    return null;
  } catch (error) {
    console.error('Error parsing AI response:', error);
    return null;
  }
}

// 从古诗词 API 获取诗句
async function fetchPoem(): Promise<{ content: string; origin: string; author: string }> {
  const response = await fetch('https://v1.jinrishici.com/all');
  if (!response.ok) {
    throw new Error('Failed to fetch poem');
  }
  return response.json();
}

export async function POST(request: Request) {
  try {
    const { difficulty, allUsedPoems } = await request.json();
    console.log('Received request:', { difficulty, allUsedPoems });

    let prompt: string;
    
    if (difficulty === 'easy') {
      // 简单模式：直接让大模型生成诗句和代码
      prompt = `请生成一句简单的中国古诗名句（不超过5字）和相关代码，要求：
         1. 必须是最家喻户晓的经典诗词名句
         2. 诗句要朗朗上口、易于记忆
         3. 严格使用真实存在的诗句，不要编造
         4. 代码中不能出现任何中文
         5. 不能是以下诗句：${allUsedPoems.join('、')}
         
         请按照以下JSON格式返回：
         {
           "poem": "举头望明月",
           "code": "if(moon.isShining()) { const reflection = window.getReflection(); }"
         }`;
    } else {
      // 困难模式：从古诗词 API 获取诗句
      const poemData = await fetchPoem();
      console.log('Fetched poem:', poemData);

      // 检查诗句是否已被使用
      if (allUsedPoems.includes(poemData.content)) {
        throw new Error('Poem has been used before');
      }

      prompt = `请根据以下古诗句生成相关的代码，要求：
         1. 从完整的诗句中只提取一句（不能低于 5 个汉字）
         2. 代码要体现诗句的意境或含义
         3. 代码中不能出现任何中文
         4. 代码要使用较复杂的语法，如 if else、try catch 等
         5. 代码长度要适中，不要太长
         
         古诗句：${poemData.content}
         
         请按照以下JSON格式返回：
         {
           "poem": "从完整的诗句中提取出的一句",
           "code": "// 这里是与诗句相关的代码"
         }`;
    }

    console.log('Sending prompt to AI:', prompt);

    const response = await fetch(API_CONFIG.AI_API_URL || '', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_CONFIG.API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: API_CONFIG.AI_MODEL,
        messages: [
          { 
            role: "system", 
            content: "你是一个诗词游戏助手。请严格按照JSON格式返回数据。" 
          },
          { 
            role: "user", 
            content: prompt
          }
        ],
        max_tokens: 2048,
        temperature: 0.7,
        presence_penalty: 1.0,
        frequency_penalty: 1.0,
        stream: false
      })
    });

    if (!response.ok) {
      console.error('AI API response not ok:', response.status, response.statusText);
      throw new Error('AI API request failed');
    }

    const data = await response.json();
    console.log('AI API response:', data);

    // 从 AI 响应中提取数据
    const content = data.choices[0].message.content;
    console.log('AI response content:', content);

    const poemDataFromAI = parseAIResponse(content);

    if (!poemDataFromAI || !poemDataFromAI.poem || !poemDataFromAI.code) {
      console.error('Failed to parse poem data from:', content);
      throw new Error('Invalid response format from AI');
    }

    // 格式化代码
    const formattedCode = await formatCode(poemDataFromAI.code);

    const formattedResponse = {
      poem: poemDataFromAI.poem,
      code: formattedCode
    };

    console.log('Formatted response:', formattedResponse);
    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error('Error generating poem:', error);
    return NextResponse.json(
      { error: 'Failed to generate poem' },
      { status: 500 }
    );
  }
} 