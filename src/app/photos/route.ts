import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  
  // 生成测试数据
  const photos = Array.from({ length: limit }, (_, i) => ({
    id: (page - 1) * limit + i + 1,
    url: `https://picsum.photos/seed/${(page - 1) * limit + i + 1}/800/800`,
    title: `Photo ${(page - 1) * limit + i + 1}`
  }))

  return new Response(JSON.stringify(photos), {
    headers: {
      'content-type': 'application/json',
      // 添加 CORS 头以允许跨域请求
      'Access-Control-Allow-Origin': '*',
    },
  })
} 