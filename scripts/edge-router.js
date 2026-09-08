// Custom-domain front door. The independently Git-built Pages site owns assets.
export default {
  async fetch(request) {
    const url = new URL(request.url);
    url.hostname = 'deskmux-site-7l8.pages.dev';
    const response = await fetch(new Request(url, request));
    return new Response(response.body, response);
  }
};
