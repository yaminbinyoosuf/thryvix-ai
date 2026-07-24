export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const response = await env.ASSETS.fetch(request);
    
    // If asset found, return it
    if (response.status !== 404) return response;
    
    // For all routes, serve index.html (SPA fallback)
    return env.ASSETS.fetch(new Request(new URL('/index.html', request.url)));
  }
}
