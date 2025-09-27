document.addEventListener('DOMContentLoaded', () => {
  const isDark = document.body.classList.contains('dark-mode');
  const textColor = isDark ? '#fff' : '#333';
  const page = document.body.getAttribute('data-page');

  fetch('data.json') // ✅ تم تعديل المسار هنا
    .then(res => res.json())
    .then(data => {
      // 🟢 crops.html
      if (page === 'crops') {
        const crops = data.crops;
        const ctx = document.getElementById('cropsChart').getContext('2d');
        new Chart(ctx, {
          type: 'bubble',
          data: {
            datasets: crops.map(crop => ({
              label: crop.name,
              data: [{ x: crop.typeIndex, y: crop.area, r: crop.importance }],
              backgroundColor: crop.color || '#81c784'
            }))
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'توزيع المحاصيل حسب النوع والمساحة',
                font: { size: 18, weight: 'bold' },
                color: textColor
              },
              legend: { labels: { color: textColor } }
            },
            scales: {
              x: {
                title: { display: true, text: 'نوع المحصول', color: textColor },
                ticks: { color: textColor }
              },
              y: {
                title: { display: true, text: 'المساحة المزروعة (هكتار)', color: textColor },
                ticks: { color: textColor }
              }
            }
          }
        });

        const list = document.getElementById('cropList');
        const input = document.getElementById('cropSearch');
        function renderList(filter = '') {
          list.innerHTML = '';
          crops
            .filter(c => c.name.toLowerCase().includes(filter.toLowerCase()))
            .forEach(c => {
              const li = document.createElement('li');
              li.className = 'search-item';
              li.textContent = `${c.name} - ${c.region}`;
              list.appendChild(li);
            });
        }
        input.addEventListener('input', () => renderList(input.value));
        renderList();
      }

      // 🟢 plants.html
      if (page === 'plants') {
        const plants = data.plants;
        const counts = { medicinal: 0, aromatic: 0, decorative: 0, wild: 0 };
        plants.forEach(p => {
          if (p.usage === 'طبي') counts.medicinal++;
          else if (p.usage === 'عطري') counts.aromatic++;
          else if (p.usage === 'زينة') counts.decorative++;
          else if (p.usage === 'برّي') counts.wild++;
        });

        const ctx = document.getElementById('plantsChart').getContext('2d');
        new Chart(ctx, {
          type: 'pie',
          data: {
            labels: ['طبية', 'عطرية', 'زينة', 'برية'],
            datasets: [{
              data: [counts.medicinal, counts.aromatic, counts.decorative, counts.wild],
              backgroundColor: ['#81c784', '#4db6ac', '#ffb74d', '#aed581'],
              borderColor: '#fff',
              borderWidth: 2
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'أنواع النباتات في الأردن',
                font: { size: 18, weight: 'bold' },
                color: textColor
              },
              legend: { labels: { color: textColor } }
            }
          }
        });

        const list = document.getElementById('plantList');
        const input = document.getElementById('plantSearch');
        function renderList(filter = '') {
          list.innerHTML = '';
          plants
            .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
            .forEach(p => {
              const li = document.createElement('li');
              li.className = 'search-item';
              li.textContent = `🌿 ${p.name} — ${p.usage}`;
              list.appendChild(li);
            });
        }
        input.addEventListener('input', () => renderList(input.value));
        renderList();
      }

      // 🟢 diseases.html
      if (page === 'diseases') {
        const d = data.diseases;
        const ctx = document.getElementById('diseasesChart').getContext('2d');
        new Chart(ctx, {
          type: 'radar',
          data: {
            labels: ['بياض دقيقي', 'لفحة', 'ذبول', 'تبقع', 'عفن'],
            datasets: [{
              label: 'نسبة التأثير على الإنتاج',
              data: [d.powdery, d.blight, d.wilt, d.spot, d.rot],
              backgroundColor: 'rgba(129,199,132,0.2)',
              borderColor: '#81c784',
              borderWidth: 2,
              pointBackgroundColor: '#fff'
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'تأثير الأمراض النباتية على الإنتاج',
                font: { size: 18, weight: 'bold' },
                color: textColor
              },
              legend: { labels: { color: textColor } }
            },
            scales: {
              r: {
                angleLines: { color: textColor },
                grid: { color: textColor },
                pointLabels: { color: textColor },
                ticks: { color: textColor, beginAtZero: true }
              }
            }
          }
        });
      }

      // 🟢 irrigation.html
      if (page === 'irrigation') {
        const i = data.irrigation;
        const ctx = document.getElementById('irrigationChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['تنقيط', 'غمر', 'رش', 'ذكي'],
            datasets: [{
              label: 'نسبة الاستخدام',
              data: [i.drip, i.flood, i.sprinkler, i.smart],
              backgroundColor: ['#81c784', '#4db6ac', '#ffb74d', '#aed581']
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'نسب استخدام أنظمة الري في الأردن',
                font: { size: 18, weight: 'bold' },
                color: textColor
              },
              legend: { labels: { color: textColor } }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: textColor },
                title: { display: true, text: 'النسبة %', color: textColor }
              },
              x: { ticks: { color: textColor } }
            }
          }
        });
      }

      // 🟢 vertical.html
      if (page === 'vertical') {
        const v = data.vertical;
        const ctx = document.getElementById('verticalChart').getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['الوحدات', 'نسبة النمو', 'التغطية الحضرية'],
            datasets: [{
              label: 'الزراعة العمودية',
              data: [v.units, v.growthRate, v.urbanCoverage],
              backgroundColor: 'rgba(129,199,132,0.2)',
              borderColor: '#81c784',
              borderWidth: 2,
              fill: true,
              tension: 0.3
            }]
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: 'مؤشرات الزراعة العمودية في الأردن',
                font: { size: 18, weight: 'bold' },
                color: textColor
              },
              legend: { labels: { color: textColor } }
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: { color: textColor },
                title: { display: true, text: 'القيمة', color: textColor }
              },
              x: { ticks: { color: textColor } }
            }
          }
        });
      }
    })
    .catch(err => console.error('❌ خطأ في تحميل البيانات:', err));
});
