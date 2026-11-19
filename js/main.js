/**
 * Agung Deriko Nainggolan — Portfolio Main Interaction Script
 */

(function () {
  'use strict';

  // State
  let currentLang = localStorage.getItem('agy_portfolio_lang') || 'id';
  let activeProjectFilter = 'all';
  let activeTechFilter = 'all';

  // DOM
  const modalContainer = document.getElementById('modal-container');
  const modalContent   = document.getElementById('modal-content');
  const toast          = document.getElementById('toast');
  const toastMessage   = document.getElementById('toast-message');
  const langToggleBtn  = document.getElementById('lang-toggle-btn');
  const currentLangLabel = document.getElementById('current-lang-label');

  // =====================================================================
  // TOAST
  // =====================================================================
  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.style.transform = 'translateY(0)';
    toast.style.opacity   = '1';
    setTimeout(() => {
      toast.style.transform = 'translateY(12px)';
      toast.style.opacity   = '0';
    }, 3000);
  }

  window.copyToClipboard = function (text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => showToast(successMsg || 'Disalin!'))
        .catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  };

  function fallbackCopy(text, successMsg) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(ta);
    ta.focus(); ta.select();
    try { document.execCommand('copy'); showToast(successMsg || 'Disalin!'); }
    catch { showToast('Gagal menyalin'); }
    document.body.removeChild(ta);
  }

  // =====================================================================
  // ICONS
  // =====================================================================
  function refreshIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  // =====================================================================
  // RENDER ALL
  // =====================================================================
  function renderAll() {
    renderHeroStats();
    renderAboutSection();
    renderEducation();
    renderExperience();
    renderTechStack(activeTechFilter);
    renderProjects(activeProjectFilter);
    renderCertificates();
    updateTextTranslations();
    refreshIcons();
  }

  // =====================================================================
  // HERO STATS
  // =====================================================================
  function renderHeroStats() {
    const container = document.getElementById('hero-stats');
    if (!container) return;
    container.innerHTML = portfolioData.stats.map(st => `
      <div class="stat-card">
        <div style="display:flex;align-items:baseline;gap:3px">
          <span class="stat-value">${st.value}</span>
          <span class="stat-suffix font-mono">${st.suffix}</span>
        </div>
        <p class="stat-label font-mono">${currentLang === 'id' ? st.labelId : st.labelEn}</p>
      </div>
    `).join('');
  }

  // =====================================================================
  // ABOUT
  // =====================================================================
  function renderAboutSection() {
    const parasEl   = document.getElementById('about-paragraphs');
    const pillarsEl = document.getElementById('about-pillars');

    if (parasEl) {
      const paras = currentLang === 'id' ? portfolioData.about.paragraphsId : portfolioData.about.paragraphsEn;
      parasEl.innerHTML = paras.map(p => `<p style="color:var(--text-secondary);line-height:1.65;font-size:14px;margin:0">${p}</p>`).join('');
    }

    if (pillarsEl) {
      const pillars = currentLang === 'id' ? portfolioData.about.pillarsId : portfolioData.about.pillarsEn;
      pillarsEl.innerHTML = pillars.map(pil => `
        <div class="card" style="padding:20px;border-radius:12px">
          <div style="width:32px;height:32px;border-radius:8px;background:var(--bg-raised);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;margin-bottom:12px">
            <i data-lucide="${pil.icon}" style="width:15px;height:15px;stroke:var(--text-muted)"></i>
          </div>
          <h4 style="font-size:13px;font-weight:500;color:var(--text-primary);margin:0 0 6px">${pil.title}</h4>
          <p style="font-size:12px;line-height:1.6;color:var(--text-secondary);margin:0">${pil.desc}</p>
        </div>
      `).join('');
    }
  }

  // =====================================================================
  // EDUCATION
  // =====================================================================
  function renderEducation() {
    const container = document.getElementById('education-list');
    if (!container) return;
    container.innerHTML = portfolioData.education.map(edu => `
      <div class="card" style="padding:24px;border-radius:12px;display:flex;gap:20px;align-items:flex-start">
        <div style="width:64px;height:64px;border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg-deep);flex-shrink:0">
          <img src="${edu.image}" alt="${edu.institution}" style="width:100%;height:100%;object-fit:cover;object-position:top;display:block" />
        </div>
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:8px">
            <span class="font-mono" style="font-size:11px;color:var(--text-muted)">${edu.period}</span>
            <span class="font-mono" style="font-size:11px;color:var(--accent)">${edu.gpa}</span>
          </div>
          <h3 style="font-size:15px;font-weight:500;color:var(--text-primary);margin:0 0 3px">${edu.institution}</h3>
          <p style="font-size:13px;color:var(--accent);margin:0 0 8px">${currentLang === 'id' ? edu.degreeId : edu.degreeEn}</p>
          <p style="font-size:13px;line-height:1.6;color:var(--text-secondary);margin:0 0 8px">${currentLang === 'id' ? edu.descriptionId : edu.descriptionEn}</p>
          <div class="flex items-center gap-1.5" style="font-size:12px;color:var(--text-muted)">
            <i data-lucide="map-pin" style="width:12px;height:12px"></i>
            <span>${edu.location}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // =====================================================================
  // EXPERIENCE TIMELINE
  // =====================================================================
  function renderExperience() {
    const container = document.getElementById('experience-timeline');
    if (!container) return;
    container.innerHTML = portfolioData.experience.map((exp, idx) => `
      <div style="position:relative;padding-left:28px;padding-bottom:${idx < portfolioData.experience.length - 1 ? '40px' : '0'};${idx < portfolioData.experience.length - 1 ? 'border-left:1px solid var(--border)' : ''}">
        <!-- Node -->
        <div class="timeline-node" style="position:absolute;left:-5px;top:4px"></div>

        <div class="card card-accent" style="padding:24px;border-radius:12px">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:12px">
            <div>
              <span class="font-mono" style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em">${exp.type}</span>
              <h3 style="font-size:16px;font-weight:500;color:var(--text-primary);margin:4px 0 2px">${currentLang === 'id' ? exp.roleId : exp.roleEn}</h3>
              <div class="flex items-center gap-2" style="font-size:13px;color:var(--text-secondary)">
                <i data-lucide="building-2" style="width:13px;height:13px;stroke:var(--text-muted)"></i>
                <span>${exp.company}</span>
              </div>
            </div>
            <div style="text-align:right;flex-shrink:0">
              <span class="font-mono" style="font-size:12px;color:var(--text-muted)">${exp.period}</span>
              <p style="font-size:12px;color:var(--text-muted);margin:3px 0 0">${exp.location}</p>
            </div>
          </div>

          ${exp.image ? `
            <div style="margin-bottom:16px;border-radius:10px;overflow:hidden;border:1px solid var(--border);max-height:200px">
              <img src="${exp.image}" alt="${exp.company}" style="width:100%;height:100%;object-fit:cover;object-position:center;display:block" />
            </div>
          ` : ''}

          <p style="font-size:13px;line-height:1.65;color:var(--text-secondary);margin:0 0 12px">${currentLang === 'id' ? exp.descriptionId : exp.descriptionEn}</p>

          <ul style="display:flex;flex-direction:column;gap:6px;margin:0 0 16px;padding:0;list-style:none">
            ${(currentLang === 'id' ? exp.bulletsId : exp.bulletsEn).map(b => `
              <li style="display:flex;align-items:flex-start;gap:8px;font-size:13px;color:var(--text-secondary)">
                <span class="status-dot" style="margin-top:5px;flex-shrink:0"></span>
                <span>${b}</span>
              </li>
            `).join('')}
          </ul>

          <div style="display:flex;flex-wrap:wrap;gap:6px;padding-top:16px;border-top:1px solid var(--border)">
            ${exp.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  // =====================================================================
  // TECH STACK
  // =====================================================================
  function renderTechStack(filterCategory = 'all') {
    const container = document.getElementById('tech-grid');
    if (!container) return;
    const cats = filterCategory === 'all'
      ? portfolioData.techStack
      : portfolioData.techStack.filter(c => c.category === filterCategory);

    container.innerHTML = cats.map(cat => `
      <div class="card" style="padding:24px;border-radius:12px">
        <div style="display:flex;align-items:center;justify-content:space-between;padding-bottom:16px;border-bottom:1px solid var(--border);margin-bottom:16px">
          <h3 style="font-size:14px;font-weight:500;color:var(--text-primary);margin:0;display:flex;align-items:center;gap:8px">
            <span class="status-dot"></span>
            ${currentLang === 'id' ? cat.categoryNameId : cat.categoryNameEn}
          </h3>
          <span class="font-mono" style="font-size:11px;color:var(--text-muted)">${cat.skills.length} techs</span>
        </div>
        <div class="grid gap-2" style="grid-template-columns:1fr 1fr">
          ${cat.skills.map(skill => `
            <div class="card" style="padding:12px;border-radius:8px">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                <div style="display:flex;align-items:center;gap:8px">
                  <i data-lucide="${skill.icon}" style="width:14px;height:14px;stroke:var(--text-muted);flex-shrink:0"></i>
                  <span style="font-size:13px;font-weight:500;color:var(--text-primary)">${skill.name}</span>
                </div>
                <span class="font-mono" style="font-size:10px;color:${skill.level === 'Advanced' || skill.level === 'Expert' ? 'var(--accent)' : 'var(--text-muted)'}">${skill.level}</span>
              </div>
              <p style="font-size:11px;line-height:1.5;color:var(--text-muted);margin:0;padding-left:22px">${skill.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
    refreshIcons();
  }

  // =====================================================================
  // PROJECTS
  // =====================================================================
  function renderProjects(filterCategory = 'all') {
    const container = document.getElementById('project-grid');
    if (!container) return;
    const projects = filterCategory === 'all'
      ? portfolioData.projects
      : portfolioData.projects.filter(p => p.category === filterCategory);

    container.innerHTML = projects.map((proj, idx) => {
      const isFeatured = proj.featured;
      const isResearch = proj.id === 'research-xgboost';
      return `
        <div class="card card-accent" style="border-radius:12px;overflow:hidden;display:flex;flex-direction:column;${isFeatured ? 'grid-column:span 2' : ''}">
          <!-- Image -->
          <div class="proj-img-wrap" style="${isFeatured ? 'height:280px' : 'height:200px'}">
            <img src="${proj.image}" alt="${proj.title}" style="cursor:pointer" onclick="openProjectModal('${proj.id}')" />
            <!-- Category badge -->
            <div style="position:absolute;top:12px;left:12px;z-index:2">
              <span class="font-mono" style="font-size:10px;color:var(--text-muted);background:rgba(20,20,21,0.85);padding:3px 8px;border-radius:4px;border:1px solid var(--border)">${currentLang === 'id' ? proj.badgeId : proj.badgeEn}</span>
            </div>
            <!-- View button -->
            <div style="position:absolute;bottom:12px;right:12px;z-index:2">
              <button onclick="openProjectModal('${proj.id}')" class="btn-secondary" style="padding:6px 12px;font-size:12px;gap:6px">
                <i data-lucide="eye" style="width:13px;height:13px"></i>
                <span>${currentLang === 'id' ? 'Detail' : 'View'}</span>
              </button>
            </div>
          </div>

          <!-- Body -->
          <div style="padding:20px 24px;flex:1;display:flex;flex-direction:column;gap:12px">
            <div>
              <h3 style="font-size:16px;font-weight:500;color:var(--text-primary);margin:0 0 6px;cursor:pointer" onclick="openProjectModal('${proj.id}')">${proj.title}</h3>
              <p style="font-size:13px;line-height:1.6;color:var(--text-secondary);margin:0">${currentLang === 'id' ? proj.taglineId : proj.taglineEn}</p>
            </div>

            ${isResearch && proj.researchMetrics ? `
              <div style="padding:12px;border-radius:8px;background:var(--bg-raised);border:1px solid var(--border)">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                  <span class="font-mono" style="font-size:11px;color:var(--text-muted)">Hasil riset terbaik</span>
                  <span class="font-mono" style="font-size:13px;font-weight:500;color:var(--accent)">${proj.researchMetrics.bestMetric}</span>
                </div>
                <p style="font-size:11px;color:var(--text-muted);margin:0;line-height:1.5">Category Item ID mengungguli One-Hot Encoding pada 4 metrik (WAPE, MAE, RMSE, R²). Lag-1 dominan ±34%.</p>
              </div>
            ` : ''}

            <!-- Footer -->
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:12px;border-top:1px solid var(--border);margin-top:auto">
              <div style="display:flex;flex-wrap:wrap;gap:4px">
                ${proj.techStack.slice(0, 4).map(t => `<span class="tech-chip">${t}</span>`).join('')}
                ${proj.techStack.length > 4 ? `<span class="font-mono" style="font-size:10px;color:var(--text-muted);padding:3px 4px">+${proj.techStack.length - 4}</span>` : ''}
              </div>
              <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
                ${proj.links.demo ? `
                  <a href="${proj.links.demo}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="padding:5px 10px;font-size:11px;gap:5px;text-decoration:none">
                    <i data-lucide="${proj.links.demoType === 'playstore' ? 'smartphone' : proj.links.demoType === 'streamlit' ? 'activity' : 'external-link'}" style="width:12px;height:12px"></i>
                    <span>${proj.links.demoType === 'playstore' ? 'Play Store' : proj.links.demoType === 'streamlit' ? 'Streamlit' : 'Demo'}</span>
                  </a>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
    refreshIcons();
  }

  // =====================================================================
  // CERTIFICATES
  // =====================================================================
  function renderCertificates() {
    const container = document.getElementById('cert-grid');
    if (!container) return;
    container.innerHTML = portfolioData.certificates.map(cert => `
      <div class="card card-accent" style="border-radius:12px;overflow:hidden;cursor:pointer;display:flex;flex-direction:column" onclick="openCertificateModal('${cert.id}')">
        <div style="height:160px;overflow:hidden;background:var(--bg-deep);position:relative">
          <img src="${cert.image}" alt="${cert.title}" class="cert-img" style="width:100%;height:100%;object-fit:cover;object-position:center;display:block" />
          <!-- Type badge -->
          <div style="position:absolute;top:10px;left:10px">
            <span class="font-mono" style="font-size:10px;color:var(--text-muted);background:rgba(15,15,16,0.88);padding:3px 7px;border-radius:4px;border:1px solid var(--border)">${cert.type}</span>
          </div>
        </div>
        <div style="padding:16px;flex:1;display:flex;flex-direction:column;gap:4px">
          <h4 style="font-size:13px;font-weight:500;color:var(--text-primary);margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${cert.title}</h4>
          <p style="font-size:12px;color:var(--accent);margin:0">${cert.issuer}</p>
          <p style="font-size:11px;line-height:1.5;color:var(--text-secondary);margin:4px 0 0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${currentLang === 'id' ? cert.descriptionId : cert.descriptionEn}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;padding-top:10px;border-top:1px solid var(--border);margin-top:auto">
            <span class="font-mono" style="font-size:11px;color:var(--text-muted)">${cert.date}</span>
            <span class="flex items-center gap-1 font-mono" style="font-size:11px;color:var(--text-muted)">
              <i data-lucide="shield-check" style="width:12px;height:12px;stroke:var(--text-muted)"></i> Verified
            </span>
          </div>
        </div>
      </div>
    `).join('');
    refreshIcons();
  }

  // =====================================================================
  // MODALS
  // =====================================================================
  window.openProjectModal = function (projectId) {
    const project = portfolioData.projects.find(p => p.id === projectId);
    if (!project || !modalContainer || !modalContent) return;
    const isResearch = project.id === 'research-xgboost';

    modalContent.innerHTML = `
      <div style="padding:28px">
        <!-- Header -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding-bottom:20px;border-bottom:1px solid var(--border)">
          <div>
            <span class="font-mono" style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em">${currentLang === 'id' ? project.badgeId : project.badgeEn}</span>
            <h2 style="font-size:20px;font-weight:500;color:var(--text-primary);margin:6px 0 4px">${project.title}</h2>
            <p style="font-size:13px;color:var(--text-secondary);margin:0">${currentLang === 'id' ? project.taglineId : project.taglineEn}</p>
          </div>
          <button onclick="closeModal()" class="btn-icon" style="flex-shrink:0" aria-label="Tutup">
            <i data-lucide="x" style="width:16px;height:16px"></i>
          </button>
        </div>

        <!-- Image -->
        <div style="margin:20px 0;border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg-deep);display:flex;align-items:center;justify-content:center;max-height:400px">
          <img src="${project.image}" alt="${project.title}" style="width:100%;height:auto;max-height:400px;object-fit:contain;display:block" />
        </div>

        <!-- Content -->
        <div style="display:flex;flex-direction:column;gap:20px">
          <div>
            <h4 style="font-size:13px;font-weight:500;color:var(--text-primary);margin:0 0 8px;display:flex;align-items:center;gap:6px">
              <i data-lucide="info" style="width:13px;height:13px;stroke:var(--text-muted)"></i>
              ${currentLang === 'id' ? 'Gambaran proyek' : 'Project overview'}
            </h4>
            <p style="font-size:13px;line-height:1.65;color:var(--text-secondary);margin:0">${currentLang === 'id' ? project.overviewId : project.overviewEn}</p>
          </div>

          <div>
            <h4 style="font-size:13px;font-weight:500;color:var(--text-primary);margin:0 0 10px;display:flex;align-items:center;gap:6px">
              <i data-lucide="list" style="width:13px;height:13px;stroke:var(--text-muted)"></i>
              ${currentLang === 'id' ? 'Fitur & implementasi' : 'Features & implementation'}
            </h4>
            <ul style="display:flex;flex-direction:column;gap:6px;margin:0;padding:0;list-style:none">
              ${(currentLang === 'id' ? project.featuresId : project.featuresEn).map(f => `
                <li style="display:flex;align-items:flex-start;gap:8px;font-size:13px;color:var(--text-secondary)">
                  <span class="status-dot" style="margin-top:5px;flex-shrink:0"></span>
                  <span>${f}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          ${isResearch && project.researchMetrics ? `
            <div style="padding:20px;border-radius:10px;background:var(--bg-raised);border:1px solid rgba(245,158,11,0.2)">
              <h4 style="font-size:13px;font-weight:500;color:var(--text-primary);margin:0 0 12px">Perbandingan metrik: One-Hot vs Category Item ID</h4>
              <div style="overflow-x:auto">
                <table style="width:100%;border-collapse:collapse;font-size:12px;font-family:'Geist Mono',monospace">
                  <thead>
                    <tr style="border-bottom:1px solid var(--border)">
                      <th style="padding:8px 12px;text-align:left;color:var(--text-muted);font-weight:400">Metrik</th>
                      <th style="padding:8px 12px;text-align:left;color:var(--text-muted);font-weight:400">One-Hot Encoding</th>
                      <th style="padding:8px 12px;text-align:left;color:var(--accent);font-weight:500">Category Item ID</th>
                      <th style="padding:8px 12px;text-align:left;color:var(--text-muted);font-weight:400">Kesimpulan</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${project.researchMetrics.table.map(row => `
                      <tr style="border-bottom:1px solid var(--border)">
                        <td style="padding:8px 12px;color:var(--text-primary)">${row.metric}</td>
                        <td style="padding:8px 12px;color:var(--text-secondary)">${row.oneHot}</td>
                        <td style="padding:8px 12px;color:var(--accent);font-weight:500">${row.itemId}</td>
                        <td style="padding:8px 12px;color:var(--text-muted)">Lebih akurat</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
              <p style="font-size:11px;color:var(--text-muted);margin:10px 0 0;font-style:italic">*Fitur Lag-1 (penjualan minggu lalu) memberikan pengaruh dominan ±34%.</p>
            </div>
          ` : ''}

          <div>
            <h4 style="font-size:13px;font-weight:500;color:var(--text-primary);margin:0 0 10px;display:flex;align-items:center;gap:6px">
              <i data-lucide="code" style="width:13px;height:13px;stroke:var(--text-muted)"></i> Tech stack
            </h4>
            <div style="display:flex;flex-wrap:wrap;gap:6px">
              ${project.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:8px">
            ${project.links.demo ? `
              <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size:12px;padding:8px 16px;gap:6px;text-decoration:none">
                <i data-lucide="${project.links.demoType === 'playstore' ? 'smartphone' : project.links.demoType === 'streamlit' ? 'activity' : 'external-link'}" style="width:13px;height:13px"></i>
                <span>${project.links.demoType === 'playstore' ? 'Google Play Store' : project.links.demoType === 'streamlit' ? 'Streamlit Dashboard' : (currentLang === 'id' ? 'Kunjungi website' : 'Open demo')}</span>
              </a>
            ` : ''}
            <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="font-size:12px;padding:8px 16px;gap:6px;text-decoration:none">
              <i data-lucide="github" style="width:13px;height:13px"></i> GitHub
            </a>
          </div>
          <button onclick="closeModal()" class="font-mono" style="font-size:12px;color:var(--text-muted);background:none;border:none;cursor:pointer">
            ${currentLang === 'id' ? 'Tutup [Esc]' : 'Close [Esc]'}
          </button>
        </div>
      </div>
    `;

    modalContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    refreshIcons();
  };

  window.openCertificateModal = function (certId) {
    const cert = portfolioData.certificates.find(c => c.id === certId);
    if (!cert || !modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div style="padding:28px">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding-bottom:16px;border-bottom:1px solid var(--border)">
          <div>
            <span class="font-mono" style="font-size:11px;color:var(--text-muted)">${cert.type}</span>
            <h3 style="font-size:18px;font-weight:500;color:var(--text-primary);margin:6px 0 2px">${cert.title}</h3>
            <p style="font-size:12px;color:var(--accent);margin:0">${cert.issuer} · ${cert.date}</p>
          </div>
          <button onclick="closeModal()" class="btn-icon" aria-label="Tutup">
            <i data-lucide="x" style="width:16px;height:16px"></i>
          </button>
        </div>

        <div style="margin:20px 0;border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg-deep);display:flex;align-items:center;justify-content:center">
          <img src="${cert.image}" alt="${cert.title}" style="width:100%;height:auto;max-height:500px;object-fit:contain;display:block" />
        </div>

        <p style="font-size:13px;line-height:1.65;color:var(--text-secondary);margin:0 0 20px">${currentLang === 'id' ? cert.descriptionId : cert.descriptionEn}</p>

        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid var(--border)">
          <span class="flex items-center gap-2 font-mono" style="font-size:12px;color:var(--text-muted)">
            <i data-lucide="shield-check" style="width:14px;height:14px;stroke:var(--text-muted)"></i> Authentic & Verified
          </span>
          <button onclick="closeModal()" class="btn-secondary" style="font-size:12px;padding:7px 14px">Tutup</button>
        </div>
      </div>
    `;

    modalContainer.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    refreshIcons();
  };

  window.closeModal = function () {
    if (!modalContainer) return;
    modalContainer.style.display = 'none';
    document.body.style.overflow = '';
  };

  // Close on backdrop click
  if (modalContainer) {
    modalContainer.addEventListener('click', e => {
      if (e.target === modalContainer) closeModal();
    });
  }

  // Esc to close
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // =====================================================================
  // LANGUAGE SWITCHER
  // =====================================================================
  function updateTextTranslations() {
    document.querySelectorAll('[data-i18n-id]').forEach(el => {
      const id = el.getAttribute('data-i18n-id');
      const en = el.getAttribute('data-i18n-en');
      if (currentLang === 'id' && id) el.textContent = id;
      else if (currentLang === 'en' && en) el.textContent = en;
    });
    if (currentLangLabel) currentLangLabel.textContent = currentLang.toUpperCase();
  }

  function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    localStorage.setItem('agy_portfolio_lang', currentLang);
    renderAll();
    showToast(currentLang === 'id' ? 'Bahasa diubah ke Bahasa Indonesia' : 'Language switched to English');
  }

  if (langToggleBtn) langToggleBtn.addEventListener('click', toggleLanguage);

  // =====================================================================
  // FILTER BUTTONS
  // =====================================================================
  function initFilterButtons() {
    document.querySelectorAll('.project-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.project-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeProjectFilter = btn.getAttribute('data-filter') || 'all';
        renderProjects(activeProjectFilter);
      });
    });

    document.querySelectorAll('.tech-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tech-filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTechFilter = btn.getAttribute('data-filter') || 'all';
        renderTechStack(activeTechFilter);
      });
    });
  }

  // =====================================================================
  // TERMINAL EASTER EGG
  // =====================================================================

  // Exposed for inline onclick buttons
  window.runTerminalCmd = function(cmd) {
    const input = document.getElementById('terminal-input');
    if (input) {
      input.value = cmd;
      executeTerminalCommand(cmd, document.getElementById('terminal-output'));
      input.value = '';
    }
  };

  function initTerminal() {
    const input  = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    if (!input || !output) return;

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const val = input.value.trim().toLowerCase();
        input.value = '';
        executeTerminalCommand(val, output);
      }
    });
  }

  function executeTerminalCommand(cmd, output) {
    if (cmd === 'clear') { output.innerHTML = ''; return; }
    if (!cmd) return;

    let response = '';
    switch (cmd) {
      case 'help':
        response = `<span style="color:var(--text-secondary)">
          Perintah tersedia:<br/>
          &nbsp;· <span style="color:var(--accent)">about</span>    — profil singkat<br/>
          &nbsp;· <span style="color:var(--accent)">skills</span>   — keahlian & stack<br/>
          &nbsp;· <span style="color:var(--accent)">projects</span> — daftar proyek<br/>
          &nbsp;· <span style="color:var(--accent)">stats</span>    — capaian & statistik<br/>
          &nbsp;· <span style="color:var(--accent)">contact</span>  — kontak & profil<br/>
          &nbsp;· <span style="color:var(--accent)">clear</span>    — bersihkan terminal
        </span>`;
        break;
      case 'about':
        response = `<span style="color:var(--text-secondary)">
          <span style="color:var(--text-primary);font-weight:500">Agung Deriko Nainggolan</span><br/>
          Lulusan D4 Teknik Informatika ULBI, IPK 3.67/4.00.<br/>
          Spesialisasi Frontend (React, Tailwind) & Mobile (Flutter, FlutterFlow).
        </span>`;
        break;
      case 'skills':
        response = `<span style="color:var(--text-secondary)">
          · <span style="color:var(--text-muted)">Frontend:</span> React JS, JavaScript (ES6+), Tailwind CSS, HTML/CSS<br/>
          · <span style="color:var(--text-muted)">Mobile:</span> Flutter, Dart, FlutterFlow, Android Studio<br/>
          · <span style="color:var(--text-muted)">Backend & DB:</span> Go, PHP, MySQL, PostgreSQL, MongoDB<br/>
          · <span style="color:var(--text-muted)">Tools & ML:</span> Git, Postman, Firebase, XGBoost, Streamlit
        </span>`;
        break;
      case 'projects':
        response = `<span style="color:var(--text-secondary)">
          1. <span style="color:var(--text-primary)">SyncroApp</span> — <a href="https://syncroapp.github.io/login/" target="_blank" style="color:var(--accent);text-decoration:none">syncroapp.github.io</a><br/>
          2. <span style="color:var(--text-primary)">Chicken Holic</span> — <a href="https://play.google.com/store/apps/details?id=com.chickenholic.app" target="_blank" style="color:var(--accent);text-decoration:none">Google Play Store</a><br/>
          3. <span style="color:var(--text-primary)">Legend Badminton</span> — <a href="https://legendbadminton.com/" target="_blank" style="color:var(--accent);text-decoration:none">legendbadminton.com</a><br/>
          4. <span style="color:var(--text-primary)">Sampahku</span> — <a href="https://sampahkudev.github.io/landing-page/" target="_blank" style="color:var(--accent);text-decoration:none">sampahkudev.github.io</a><br/>
          5. <span style="color:var(--text-primary)">Penelitian XGBoost</span> — <a href="https://qtskxoh94pb2sybdhca9sr.streamlit.app/" target="_blank" style="color:var(--accent);text-decoration:none">Streamlit Dashboard</a>
        </span>`;
        break;
      case 'stats':
        response = `<span style="color:var(--text-secondary)">
          · IPK: <span style="color:var(--text-primary)">3.67 / 4.00</span> (D4 Teknik Informatika ULBI)<br/>
          · Magang: <span style="color:var(--text-primary)">4 bulan</span> di CV Digisolf Technology Consulting<br/>
          · Riset XGBoost: <span style="color:var(--accent)">WAPE 16.36%</span> (Category Item ID vs One-Hot)<br/>
          · TOEIC: <span style="color:var(--text-primary)">655</span> · TOEFL: <span style="color:var(--text-primary)">480</span>
        </span>`;
        break;
      case 'contact':
        response = `<span style="color:var(--text-secondary)">
          · Email: <a href="mailto:agung.nainggolan8008@gmail.com" style="color:var(--accent);text-decoration:none">agung.nainggolan8008@gmail.com</a><br/>
          · WhatsApp: <a href="https://wa.me/6282360711385" target="_blank" style="color:var(--accent);text-decoration:none">+62 823-6071-1385</a><br/>
          · GitHub: <a href="https://github.com/agung6544" target="_blank" style="color:var(--accent);text-decoration:none">github.com/agung6544</a><br/>
          · LinkedIn: <a href="https://www.linkedin.com/in/agungderiko-nainggolan/" target="_blank" style="color:var(--accent);text-decoration:none">Agung Deriko Nainggolan</a>
        </span>`;
        break;
      default:
        response = `<span style="color:var(--text-muted)">Perintah '${cmd}' tidak dikenal. Ketik <span style="color:var(--accent)">help</span> untuk daftar perintah.</span>`;
    }

    const row = document.createElement('div');
    row.style.marginTop = '10px';
    row.innerHTML = `
      <div class="font-mono" style="font-size:12px;color:var(--text-muted)">
        <span style="color:var(--accent)">agung@portfolio</span>:~$ <span style="color:var(--text-primary)">${cmd}</span>
      </div>
      <div class="font-mono" style="font-size:12px;padding-left:16px;margin-top:4px;line-height:1.65">${response}</div>
    `;
    output.appendChild(row);
    output.scrollTop = output.scrollHeight;
  }

  // =====================================================================
  // NAVBAR SCROLL
  // =====================================================================
  function initNavScroll() {
    const navbar   = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;

      if (navbar) {
        if (scrollY > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }

      sections.forEach(sec => {
        const top    = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        const id     = sec.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });
  }

  // =====================================================================
  // MOBILE MENU
  // =====================================================================
  function initMobileMenu() {
    const btn  = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => menu.classList.toggle('hidden'));

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => menu.classList.add('hidden'));
    });
  }

  // =====================================================================
  // RESPONSIVE HERO GRID
  // =====================================================================
  function initResponsiveHero() {
    const heroGrid    = document.getElementById('hero-grid');
    const photoCol    = document.getElementById('hero-photo-col');
    if (!heroGrid || !photoCol) return;

    function checkWidth() {
      if (window.innerWidth < 900) {
        heroGrid.style.gridTemplateColumns = '1fr';
        photoCol.style.maxWidth = '340px';
        photoCol.style.margin   = '0 auto';
      } else {
        heroGrid.style.gridTemplateColumns = '1fr 320px';
        photoCol.style.maxWidth = '';
        photoCol.style.margin   = '';
      }
    }

    checkWidth();
    window.addEventListener('resize', checkWidth);
  }

  // =====================================================================
  // RESPONSIVE GRID ADJUSTMENTS
  // =====================================================================
  function initResponsiveGrids() {
    const techGridEl    = document.getElementById('tech-grid');
    const projectGridEl = document.getElementById('project-grid');
    const certGridEl    = document.getElementById('cert-grid');
    const aboutPillars  = document.getElementById('about-pillars');
    const heroStats     = document.getElementById('hero-stats');
    const aboutGrid     = document.querySelector('#about .grid[style*="300px"]');
    const researchGrid  = document.querySelector('#research .grid[style*="380px"]');

    function adjustGrids() {
      const w = window.innerWidth;
      if (techGridEl)    techGridEl.style.gridTemplateColumns    = w < 768 ? '1fr' : 'repeat(2,1fr)';
      if (projectGridEl) projectGridEl.style.gridTemplateColumns = w < 768 ? '1fr' : 'repeat(2,1fr)';
      if (certGridEl)    certGridEl.style.gridTemplateColumns    = w < 640 ? '1fr' : w < 1024 ? 'repeat(2,1fr)' : 'repeat(3,1fr)';
      if (aboutPillars)  aboutPillars.style.gridTemplateColumns  = w < 640 ? '1fr' : '1fr 1fr';
      if (heroStats)     heroStats.style.gridTemplateColumns     = w < 640 ? 'repeat(2,1fr)' : 'repeat(4,1fr)';
    }

    adjustGrids();
    window.addEventListener('resize', adjustGrids);
  }

  // =====================================================================
  // RESPONSIVE ABOUT & RESEARCH GRIDS
  // =====================================================================
  function initResponsiveLayouts() {
    // About: 300px + 1fr -> stack on mobile
    const aboutSection = document.getElementById('about');
    const aboutInner   = aboutSection ? aboutSection.querySelector('.container-page > .grid') : null;
    // Research: 1fr + 380px -> stack on medium
    const researchSection = document.getElementById('research');
    const researchInner   = researchSection ? researchSection.querySelector('.card > .grid') : null;

    function adjustLayouts() {
      const w = window.innerWidth;
      if (aboutInner) {
        aboutInner.style.gridTemplateColumns = w < 900 ? '1fr' : '300px 1fr';
      }
      if (researchInner) {
        researchInner.style.gridTemplateColumns = w < 900 ? '1fr' : '1fr 380px';
      }
    }

    adjustLayouts();
    window.addEventListener('resize', adjustLayouts);
  }

  // =====================================================================
  // RESEARCH IMAGE HOVER
  // =====================================================================
  function initResearchHover() {
    const img = document.getElementById('research-img');
    const card = img ? img.closest('.card') : null;
    if (!img || !card) return;
    card.addEventListener('mouseenter', () => img.style.transform = 'scale(1.03)');
    card.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
  }

  // =====================================================================
  // INIT
  // =====================================================================
  document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    initFilterButtons();
    initTerminal();
    initNavScroll();
    initMobileMenu();
    initResponsiveHero();
    initResponsiveGrids();
    initResearchHover();
  });

})();
