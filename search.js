function setupSearch(inputId, listId, dataKey, displayFn) {
  fetch('data/data.json')
    .then(res => res.json())
    .then(data => {
      const items = data[dataKey];
      const input = document.getElementById(inputId);
      const list = document.getElementById(listId);

      if (!input || !list || !items) {
        console.warn('⚠️ عنصر البحث أو القائمة أو البيانات غير موجود.');
        return;
      }

      let timeout;

      function renderList(filter = '') {
        list.innerHTML = '';
        const normalized = filter.trim().toLowerCase();

        const matched = items.filter(item =>
          item.name && item.name.toLowerCase().includes(normalized)
        );

        if (matched.length > 0) {
          matched.forEach(item => {
            const li = document.createElement('li');
            li.classList.add('search-item');
            li.innerHTML = `<strong>${item.name}</strong>` +
              (item.usage ? ` — ${item.usage}` : '') +
              (item.region ? ` — ${item.region}` : '') +
              (item.description ? `<br><small>${item.description}</small>` : '');
            list.appendChild(li);
          });
        } else {
          const li = document.createElement('li');
          li.textContent = 'لا توجد نتائج مطابقة.';
          li.classList.add('no-results');
          list.appendChild(li);
        }
      }

      input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => renderList(input.value), 200);
      });

      renderList();
    })
    .catch(err => console.error('❌ خطأ في تحميل البيانات:', err));
}

