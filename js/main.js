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
      <div class="card" style="padding:22px;border-radius:12px">
        <div class="edu-card-wrap">
          <div style="width:56px;height:56px;border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg-deep);flex-shrink:0">
            <img src="${edu.image}" alt="${edu.institution}" style="width:100%;height:100%;object-fit:cover;object-position:top;display:block" />
          </div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:8px">
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
        <div class="skills-inner-grid">
          ${cat.skills.map(skill => `
            <div class="card" style="padding:12px;border-radius:8px">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;gap:6px">
                <div style="display:flex;align-items:center;gap:7px;min-width:0">
                  <i data-lucide="${skill.icon}" style="width:14px;height:14px;stroke:var(--text-muted);flex-shrink:0"></i>
                  <span style="font-size:13px;font-weight:500;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${skill.name}</span>
                </div>
                <span class="font-mono" style="font-size:10px;flex-shrink:0;color:${skill.level === 'Advanced' || skill.level === 'Expert' ? 'var(--accent)' : 'var(--text-muted)'}">${skill.level}</span>
              </div>
              <p style="font-size:11px;line-height:1.5;color:var(--text-muted);margin:0;padding-left:21px">${skill.desc}</p>
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
        <div class="card card-accent ${isFeatured ? 'project-featured-span' : ''}" style="border-radius:12px;overflow:hidden;display:flex;flex-direction:column">
          <!-- Image -->
          <div class="proj-img-wrap" style="${isFeatured ? 'height:clamp(200px, 30vw, 280px)' : 'height:clamp(170px, 24vw, 210px)'}">
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
      <div class="modal-inner-pad">
        <!-- Header -->
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding-bottom:16px;border-bottom:1px solid var(--border)">
          <div>
            <span class="font-mono" style="font-size:11px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em">${currentLang === 'id' ? project.badgeId : project.badgeEn}</span>
            <h2 style="font-size:18px;font-weight:500;color:var(--text-primary);margin:4px 0 2px" class="sm:text-xl">${project.title}</h2>
            <p style="font-size:12.5px;color:var(--text-secondary);margin:0" class="sm:text-sm">${currentLang === 'id' ? project.taglineId : project.taglineEn}</p>
          </div>
          <button onclick="closeModal()" class="btn-icon" style="flex-shrink:0" aria-label="Tutup">
            <i data-lucide="x" style="width:16px;height:16px"></i>
          </button>
        </div>

        <!-- Image -->
        <div style="margin:16px 0;border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg-deep);display:flex;align-items:center;justify-content:center;max-height:360px">
          <img src="${project.image}" alt="${project.title}" style="width:100%;height:auto;max-height:360px;object-fit:contain;display:block" />
        </div>

        <!-- Content -->
        <div style="display:flex;flex-direction:column;gap:18px">
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
            <div style="padding:16px;border-radius:10px;background:var(--bg-raised);border:1px solid rgba(245,158,11,0.2)">
              <h4 style="font-size:13px;font-weight:500;color:var(--text-primary);margin:0 0 10px">Perbandingan metrik: One-Hot vs Category Item ID</h4>
              <div class="table-scroll-wrap">
                <table style="width:100%;border-collapse:collapse;font-size:11.5px;font-family:'Geist Mono',monospace;min-width:440px">
                  <thead>
                    <tr style="border-bottom:1px solid var(--border)">
                      <th style="padding:6px 10px;text-align:left;color:var(--text-muted);font-weight:400">Metrik</th>
                      <th style="padding:6px 10px;text-align:left;color:var(--text-muted);font-weight:400">One-Hot</th>
                      <th style="padding:6px 10px;text-align:left;color:var(--accent);font-weight:500">Item ID</th>
                      <th style="padding:6px 10px;text-align:left;color:var(--text-muted);font-weight:400">Hasil</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${project.researchMetrics.table.map(row => `
                      <tr style="border-bottom:1px solid var(--border)">
                        <td style="padding:6px 10px;color:var(--text-primary)">${row.metric}</td>
                        <td style="padding:6px 10px;color:var(--text-secondary)">${row.oneHot}</td>
                        <td style="padding:6px 10px;color:var(--accent);font-weight:500">${row.itemId}</td>
                        <td style="padding:6px 10px;color:var(--text-muted)">Lebih akurat</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
              <p style="font-size:10.5px;color:var(--text-muted);margin:8px 0 0;font-style:italic">*Fitur Lag-1 memberikan pengaruh dominan ±34%.</p>
            </div>
          ` : ''}

          <div>
            <h4 style="font-size:13px;font-weight:500;color:var(--text-primary);margin:0 0 8px;display:flex;align-items:center;gap:6px">
              <i data-lucide="code" style="width:13px;height:13px;stroke:var(--text-muted)"></i> Tech stack
            </h4>
            <div style="display:flex;flex-wrap:wrap;gap:5px">
              ${project.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            ${project.links.demo ? `
              <a href="${project.links.demo}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="font-size:12px;padding:7px 14px;gap:6px;text-decoration:none">
                <i data-lucide="${project.links.demoType === 'playstore' ? 'smartphone' : project.links.demoType === 'streamlit' ? 'activity' : 'external-link'}" style="width:13px;height:13px"></i>
                <span>${project.links.demoType === 'playstore' ? 'Google Play' : project.links.demoType === 'streamlit' ? 'Streamlit App' : (currentLang === 'id' ? 'Buka Website' : 'Open demo')}</span>
              </a>
            ` : ''}
            <a href="${project.links.github}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="font-size:12px;padding:7px 14px;gap:6px;text-decoration:none">
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
      <div class="modal-inner-pad">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding-bottom:14px;border-bottom:1px solid var(--border)">
          <div>
            <span class="font-mono" style="font-size:10.5px;color:var(--text-muted)">${cert.type}</span>
            <h3 style="font-size:16px;font-weight:500;color:var(--text-primary);margin:4px 0 2px" class="sm:text-lg">${cert.title}</h3>
            <p style="font-size:12px;color:var(--accent);margin:0">${cert.issuer} · ${cert.date}</p>
          </div>
          <button onclick="closeModal()" class="btn-icon" aria-label="Tutup">
            <i data-lucide="x" style="width:16px;height:16px"></i>
          </button>
        </div>

        <div style="margin:16px 0;border-radius:10px;overflow:hidden;border:1px solid var(--border);background:var(--bg-deep);display:flex;align-items:center;justify-content:center">
          <img src="${cert.image}" alt="${cert.title}" style="width:100%;height:auto;max-height:420px;object-fit:contain;display:block" />
        </div>

        <p style="font-size:13px;line-height:1.65;color:var(--text-secondary);margin:0 0 16px">${currentLang === 'id' ? cert.descriptionId : cert.descriptionEn}</p>

        <div style="display:flex;align-items:center;justify-content:space-between;padding-top:14px;border-top:1px solid var(--border)">
          <span class="flex items-center gap-1.5 font-mono" style="font-size:11px;color:var(--text-muted)">
            <i data-lucide="shield-check" style="width:13px;height:13px;stroke:var(--text-muted)"></i> Authentic & Verified
          </span>
          <button onclick="closeModal()" class="btn-secondary" style="font-size:12px;padding:6px 14px">Tutup</button>
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
    const btn    = document.getElementById('mobile-menu-btn');
    const menu   = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    if (!btn || !menu) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => menu.classList.add('hidden'));
    });

    // Close on outside tap
    document.addEventListener('click', (e) => {
      if (navbar && !navbar.contains(e.target) && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
      }
    });

    // Close on Esc
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !menu.classList.contains('hidden')) {
        menu.classList.add('hidden');
      }
    });
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
  // SCROLL PROGRESS BAR
  // =====================================================================
  function initScrollProgress() {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  // =====================================================================
  // BACK TO TOP BUTTON
  // =====================================================================
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) btn.classList.add('visible');
      else                      btn.classList.remove('visible');
    }, { passive: true });
    refreshIcons();
  }

  // =====================================================================
  // SCROLL REVEAL (IntersectionObserver)
  // =====================================================================
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
  }

  // =====================================================================
  // STAT COUNTER ANIMATION
  // =====================================================================
  function initStatCounters() {
    // Run when hero stats are in view
    const statsEl = document.getElementById('hero-stats');
    if (!statsEl) return;

    function animateCount(el, target, suffix, decimals = 0) {
      const duration = 1200;
      const start    = performance.now();
      const from     = 0;

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const val = from + (target - from) * eased;
        el.textContent = decimals > 0 ? val.toFixed(decimals) : Math.floor(val).toString();
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = decimals > 0 ? target.toFixed(decimals) : target.toString();
      }
      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        // Animate each stat
        const statEls = statsEl.querySelectorAll('.stat-value');
        const stats   = portfolioData.stats;
        statEls.forEach((el, i) => {
          if (!stats[i]) return;
          const raw = stats[i].value.replace(/[^0-9.]/g, '');
          const num = parseFloat(raw);
          if (!isNaN(num)) {
            const decimals = stats[i].value.includes('.') ? stats[i].value.split('.')[1].length : 0;
            animateCount(el, num, stats[i].suffix, decimals);
          }
        });
      }
    }, { threshold: 0.5 });

    observer.observe(statsEl);
  }

  // =====================================================================
  // TYPING CURSOR — remove after 3s to stop distraction
  // =====================================================================
  function initTypingCursor() {
    const h1 = document.querySelector('.cursor-blink');
    if (!h1) return;
    setTimeout(() => h1.classList.remove('cursor-blink'), 4000);
  }

  // =====================================================================
  // COMMAND PALETTE
  // =====================================================================
  const CMD_ITEMS = [
    { label: 'Tentang Saya',   labelEn: 'About',           icon: 'user',           href: '#about',        hint: 'Bagian' },
    { label: 'Pendidikan',     labelEn: 'Education',        icon: 'graduation-cap', href: '#education',    hint: 'Bagian' },
    { label: 'Keahlian',       labelEn: 'Skills',           icon: 'cpu',            href: '#skills',       hint: 'Bagian' },
    { label: 'Pengalaman',     labelEn: 'Experience',       icon: 'briefcase',      href: '#experience',   hint: 'Bagian' },
    { label: 'Proyek',         labelEn: 'Projects',         icon: 'layers',         href: '#projects',     hint: 'Bagian' },
    { label: 'Riset ML',       labelEn: 'ML Research',      icon: 'bar-chart-2',    href: '#research',     hint: 'Bagian' },
    { label: 'Sertifikat',     labelEn: 'Certificates',     icon: 'award',          href: '#certificates', hint: 'Bagian' },
    { label: 'Kontak',         labelEn: 'Contact',          icon: 'message-square', href: '#contact',      hint: 'Bagian' },
    { label: 'Unduh CV',       labelEn: 'Download CV',      icon: 'download',       href: 'assets/cv_agung_deriko_nainggolan.pdf', hint: 'Aksi', download: true },
    { label: 'GitHub',         labelEn: 'GitHub',           icon: 'github',         href: 'https://github.com/agung6544', hint: 'Link', external: true },
    { label: 'LinkedIn',       labelEn: 'LinkedIn',         icon: 'linkedin',       href: 'https://www.linkedin.com/in/agungderiko-nainggolan/', hint: 'Link', external: true },
    { label: 'Salin Email',    labelEn: 'Copy Email',       icon: 'copy',           action: () => window.copyToClipboard('agung.nainggolan8008@gmail.com', 'Email disalin!'), hint: 'Aksi' },
    { label: 'WhatsApp',       labelEn: 'WhatsApp',         icon: 'phone',          href: 'https://wa.me/6282360711385', hint: 'Link', external: true },
  ];

  let cmdOpen    = false;
  let cmdSelected = 0;
  let cmdFiltered = [...CMD_ITEMS];

  window.openCmd = function() {
    const backdrop = document.getElementById('cmd-backdrop');
    const input    = document.getElementById('cmd-search');
    if (!backdrop || !input) return;
    cmdOpen = true;
    cmdSelected = 0;
    cmdFiltered = [...CMD_ITEMS];
    backdrop.classList.add('open');
    renderCmdResults(cmdFiltered);
    setTimeout(() => input.focus(), 50);
  };

  window.closeCmd = function() {
    const backdrop = document.getElementById('cmd-backdrop');
    if (!backdrop) return;
    cmdOpen = false;
    backdrop.classList.remove('open');
    const input = document.getElementById('cmd-search');
    if (input) input.value = '';
  };

  function renderCmdResults(items) {
    const container = document.getElementById('cmd-results');
    if (!container) return;

    if (!items.length) {
      container.innerHTML = `<div style="padding:24px;text-align:center;font-size:13px;color:var(--text-muted)">Tidak ada hasil</div>`;
      return;
    }

    const lang = localStorage.getItem('agy_portfolio_lang') || 'id';
    container.innerHTML = items.map((item, i) => `
      <a
        class="cmd-item ${i === cmdSelected ? 'selected' : ''}"
        data-index="${i}"
        href="${item.href || '#'}"
        ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}
        ${item.download ? 'download' : ''}
        onclick="handleCmdSelect(event, ${i})"
        style="text-decoration:none"
      >
        <div class="cmd-item-icon">
          <i data-lucide="${item.icon}"></i>
        </div>
        <span class="cmd-item-label">${lang === 'en' ? item.labelEn : item.label}</span>
        <span class="cmd-item-hint">${item.hint}</span>
      </a>
    `).join('');
    refreshIcons();
  }

  window.handleCmdSelect = function(e, idx) {
    const item = cmdFiltered[idx];
    if (!item) return;
    if (item.action) {
      e.preventDefault();
      item.action();
      closeCmd();
    } else {
      closeCmd();
    }
  };

  function initCommandPalette() {
    const backdrop = document.getElementById('cmd-backdrop');
    const input    = document.getElementById('cmd-search');
    if (!backdrop || !input) return;

    // Keyboard shortcut
    window.addEventListener('keydown', e => {
      // Open: Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        cmdOpen ? closeCmd() : openCmd();
        return;
      }
      if (!cmdOpen) return;

      if (e.key === 'Escape') { closeCmd(); return; }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        cmdSelected = Math.min(cmdSelected + 1, cmdFiltered.length - 1);
        renderCmdResults(cmdFiltered);
        scrollCmdSelected();
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        cmdSelected = Math.max(cmdSelected - 1, 0);
        renderCmdResults(cmdFiltered);
        scrollCmdSelected();
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        const item = cmdFiltered[cmdSelected];
        if (!item) return;
        if (item.action) {
          item.action();
          closeCmd();
        } else if (item.href) {
          if (item.external) {
            window.open(item.href, '_blank', 'noopener,noreferrer');
          } else if (item.download) {
            const a = document.createElement('a');
            a.href = item.href; a.download = '';
            a.click();
          } else {
            window.location.hash = item.href.replace('#', '');
          }
          closeCmd();
        }
      }
    });

    // Filter on type
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase().trim();
      const lang = localStorage.getItem('agy_portfolio_lang') || 'id';
      cmdFiltered = q
        ? CMD_ITEMS.filter(item => {
            const lbl = lang === 'en' ? item.labelEn : item.label;
            return lbl.toLowerCase().includes(q) || item.hint.toLowerCase().includes(q);
          })
        : [...CMD_ITEMS];
      cmdSelected = 0;
      renderCmdResults(cmdFiltered);
    });

    // Close on backdrop click
    backdrop.addEventListener('click', e => {
      if (e.target === backdrop) closeCmd();
    });

    // Hover to select
    backdrop.addEventListener('mouseover', e => {
      const item = e.target.closest('.cmd-item');
      if (!item) return;
      const idx = parseInt(item.dataset.index, 10);
      if (!isNaN(idx)) {
        cmdSelected = idx;
        renderCmdResults(cmdFiltered);
      }
    });
  }

  function scrollCmdSelected() {
    const container = document.getElementById('cmd-results');
    if (!container) return;
    const selected = container.querySelector('.cmd-item.selected');
    if (selected) selected.scrollIntoView({ block: 'nearest' });
  }

  // =====================================================================
  // SECTION ANCHOR COPY LINK
  // =====================================================================
  function initSectionAnchors() {
    document.querySelectorAll('section[id]').forEach(section => {
      const id = section.getAttribute('id');
      const heading = section.querySelector('h2.section-title, h2, h3');
      if (!heading || !id) return;

      // Don't double-add
      if (heading.querySelector('.section-anchor-btn')) return;

      const btn = document.createElement('button');
      btn.className = 'section-anchor-btn';
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
      btn.title = 'Salin link bagian ini';
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        window.copyToClipboard(url, 'Link disalin!');
      });
      heading.appendChild(btn);
    });
  }

  // =====================================================================
  // INTERACTIVE LANYARD BADGE PHYSICS
  // =====================================================================
  function initLanyardBadge() {
    const rig   = document.getElementById('lanyard-rig');
    const card  = document.getElementById('lanyard-card');
    const clasp = document.getElementById('lanyard-clasp');
    const hint  = document.getElementById('lanyard-hint');
    const glare = document.getElementById('badge-glare');
    const path  = document.getElementById('lanyard-path');
    const pathShadow = document.getElementById('lanyard-path-shadow');
    const stitchL    = document.getElementById('lanyard-stitch-l');
    const stitchR    = document.getElementById('lanyard-stitch-r');

    if (!rig || !card || !path) return;

    // Anchor: top-center of the lanyard SVG
    const ax = 170;
    const ay = 0;

    // State variables
    let isDragging = false;
    let startPointerX = 0, startPointerY = 0;
    let startPosX = 0, startPosY = 0;
    let prevPointerX = 0, prevPointerY = 0;
    let prevTime = performance.now();

    let posX = 0, posY = 0;
    let velX = 0, velY = 0;
    let rotZ = 0, velRotZ = 0;
    let rotX = 0, rotY = 0;
    let flipAngle = 0, flipVel = 0;

    // Spring constants for elastic damping
    const kPos = 160;  // position stiffness
    const dPos = 12;   // position damping
    const kRot = 180;  // rotation stiffness
    const dRot = 14;   // rotation damping

    // Render dynamic lanyard strap SVG path
    function renderStrap(px, py) {
      // Clasp attach point relative to SVG
      const cx = 170 + px;
      const cy = 42 + py;

      // Natural catenary/bezier curve
      const midX = (ax + cx) / 2 + (px * 0.14);
      const midY = (ay + cy) / 2 - Math.max(0, -py * 0.22);

      const mainPath = `M ${ax} ${ay} Q ${midX} ${midY} ${cx} ${cy}`;
      const shadowPath = `M ${ax} ${ay + 4} Q ${midX} ${midY + 6} ${cx} ${cy + 6}`;

      path.setAttribute('d', mainPath);
      if (pathShadow) pathShadow.setAttribute('d', shadowPath);

      // Dual edge stitch lines offset by normal vector
      const dx = cx - ax;
      const dy = cy - ay;
      const len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len;
      const ny = dx / len;
      const offset = 5.2;

      const lax = ax + nx * offset;
      const lay = ay + ny * offset;
      const lcx = cx + nx * offset;
      const lcy = cy + ny * offset;
      const lmidX = midX + nx * offset;
      const lmidY = midY + ny * offset;

      const rax = ax - nx * offset;
      const ray = ay - ny * offset;
      const rcx = cx - nx * offset;
      const rcy = cy - ny * offset;
      const rmidX = midX - nx * offset;
      const rmidY = midY - ny * offset;

      if (stitchL) stitchL.setAttribute('d', `M ${lax} ${lay} Q ${lmidX} ${lmidY} ${lcx} ${lcy}`);
      if (stitchR) stitchR.setAttribute('d', `M ${rax} ${ray} Q ${rmidX} ${rmidY} ${rcx} ${rcy}`);
    }

    // Pointer events for dragging
    card.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 && e.pointerType === 'mouse') return;
      isDragging = true;
      card.setPointerCapture(e.pointerId);
      startPointerX = e.clientX;
      startPointerY = e.clientY;
      startPosX = posX;
      startPosY = posY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      prevTime = performance.now();

      if (hint) {
        hint.classList.add('fade-out');
      }
    });

    window.addEventListener('pointermove', (e) => {
      if (isDragging) {
        const rawDx = e.clientX - startPointerX;
        const rawDy = e.clientY - startPointerY;

        // Realistic tension resistance when pulled
        const tensionY = rawDy > 0
          ? Math.sign(rawDy) * Math.pow(Math.abs(rawDy), 0.88) * 1.5
          : rawDy * 0.35;
        const tensionX = Math.sign(rawDx) * Math.pow(Math.abs(rawDx), 0.9) * 1.35;

        posX = Math.max(Math.min(startPosX + tensionX, 150), -150);
        posY = Math.max(Math.min(startPosY + tensionY, 180), -40);

        // Instant velocity tracking
        const now = performance.now();
        const dt = Math.max((now - prevTime) / 1000, 0.001);
        velX = (e.clientX - prevPointerX) / dt;
        velY = (e.clientY - prevPointerY) / dt;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
        prevTime = now;

        // Card tilts naturally following the hanging lanyard vector
        const cordAngle = Math.atan2(posX, 100 + posY) * (180 / Math.PI);
        rotZ = cordAngle;
        rotX = Math.max(Math.min(-velY * 0.02, 14), -14);
        rotY = Math.max(Math.min(velX * 0.025, 18), -18);
      } else {
        // Subtle 3D perspective tilt on mouse hover
        const rect = card.getBoundingClientRect();
        if (
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top && e.clientY <= rect.bottom
        ) {
          const cx = (e.clientX - rect.left) / rect.width - 0.5;
          const cy = (e.clientY - rect.top) / rect.height - 0.5;
          rotX += (-cy * 14 - rotX) * 0.12;
          rotY += (cx * 18 - rotY) * 0.12;
        }
      }
    });

    function endDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      try { card.releasePointerCapture(e.pointerId); } catch (_) {}
      velX = Math.max(Math.min(velX * 0.55, 800), -800);
      velY = Math.max(Math.min(velY * 0.55, 800), -800);
    }

    card.addEventListener('pointerup', endDrag);
    card.addEventListener('pointercancel', endDrag);
    card.addEventListener('lostpointercapture', endDrag);

    // Double-click or double-tap to spin
    card.addEventListener('dblclick', () => {
      flipVel = 720;
    });

    // Animation physics loop
    let lastFrame = performance.now();
    function loop(now) {
      const dt = Math.min((now - lastFrame) / 1000, 0.035);
      lastFrame = now;

      if (!isDragging) {
        // Natural ambient pendulum breathing when at rest
        const t = now * 0.0016;
        const idleX = Math.sin(t) * 1.5;
        const idleY = Math.cos(t * 1.3) * 1.2;
        const idleRot = Math.sin(t * 0.8) * 1.0;

        // Elastic spring forces toward center
        const fx = -kPos * (posX - idleX) - dPos * velX;
        const fy = -kPos * (posY - idleY) - dPos * velY;

        velX += fx * dt;
        velY += fy * dt;
        posX += velX * dt;
        posY += velY * dt;

        // Pendulum rotation tracking
        const cordAngle = Math.atan2(posX, 100 + posY) * (180 / Math.PI);
        const targetRotZ = cordAngle + idleRot;
        const fRot = -kRot * (rotZ - targetRotZ) - dRot * velRotZ;
        velRotZ += fRot * dt;
        rotZ += velRotZ * dt;

        // Relax 3D tilt back to level
        rotX += (0 - rotX) * (dt * 6);
        rotY += (0 - rotY) * (dt * 6);
      }

      // Handle card flip spin animation
      if (Math.abs(flipVel) > 1 || Math.abs(flipAngle % 360) > 1) {
        flipAngle += flipVel * dt;
        flipVel -= flipVel * dt * 4;
        if (Math.abs(flipVel) < 10) {
          flipAngle += (Math.round(flipAngle / 360) * 360 - flipAngle) * dt * 10;
        }
      }

      // Apply transforms
      card.style.transform = `translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0) rotateZ(${rotZ.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) rotateY(${(rotY + flipAngle).toFixed(2)}deg)`;

      if (clasp) {
        clasp.style.transform = `translateX(-50%) translate3d(${posX.toFixed(2)}px, ${posY.toFixed(2)}px, 0) rotateZ(${(rotZ * 0.95).toFixed(2)}deg)`;
      }

      // Glare reflection positioning
      if (glare) {
        const gx = 50 + (rotY * 2.5);
        const gy = 25 + (-rotX * 2.5);
        card.style.setProperty('--glare-x', `${gx.toFixed(1)}%`);
        card.style.setProperty('--glare-y', `${gy.toFixed(1)}%`);
      }

      // Render ribbon curve
      renderStrap(posX, posY);

      requestAnimationFrame(loop);
    }

    renderStrap(0, 0);
    requestAnimationFrame(loop);
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
    initResearchHover();

    // Features
    initScrollProgress();
    initBackToTop();
    initScrollReveal();
    initStatCounters();
    initTypingCursor();
    initCommandPalette();
    initSectionAnchors();
    initLanyardBadge();
  });

})();
