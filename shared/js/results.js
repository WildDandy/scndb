import { qs } from './app.js';

document.addEventListener('DOMContentLoaded', ()=>{
  const params = new URLSearchParams(location.search);
  const q = params.get('q') || '';
  const date = params.get('date') || '';
  const order = params.get('order') || '';
  const meta = qs('#searchMeta');
  if(meta){
    meta.textContent = q ? `Search query: "${q}"${(date||order)?' | Filters applied':''}` : 'Browsing all documents';
  }
});


