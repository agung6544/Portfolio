/**
 * Agung Deriko Nainggolan - Portfolio Main Interaction Script
 * Features: Mouse Spotlight, Bilingual Toggle, Filterable Bento Grid,
 * Modals, Interactive CLI Terminal, Toast Notifications, and Scroll Spy.
 */

(function () {
  'use strict';

  // State Management
  let currentLang = localStorage.getItem('agy_portfolio_lang') || 'id';
  let activeProjectFilter = 'all';
  let activeTechFilter = 'all';

  // DOM Elements
  const mouseSpotlight = document.querySelector('.mouse-spotlight');
  const projectGrid = document.getElementById('project-grid');
  const techGrid = document.getElementById('tech-grid');
  const certGrid = document.getElementById('cert-grid');
  const modalContainer = document.getElementById('modal-container');
  const modalContent = document.getElementById('modal-content');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  const currentLangLabel = document.getElementById('current-lang-label');

  // --- 1. MOUSE SPOTLIGHT (Aceternity UI Effect) ---
  function initSpotlight() {
    window.addEventListener('mousemove', (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
  }

  // --- 2. TOAST NOTIFICATION ---
  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Global helper for copying to clipboard
  window.copyToClipboard = function (text, successMsg) {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMsg || (currentLang === 'id' ? 'Disalin ke papan klip!' : 'Copied to clipboard!'));
      }).catch(() => fallbackCopy(text, successMsg));
    } else {
      fallbackCopy(text, successMsg);
    }
  };

  function fallbackCopy(text, successMsg) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(successMsg || (currentLang === 'id' ? 'Disalin ke papan klip!' : 'Copied to clipboard!'));
    } catch (err) {
      showToast('Gagal menyalin teks');
    }
    document.body.removeChild(textArea);
  }

  // --- 3. DYNAMIC RENDERING ---
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

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // Render Hero Stats
  function renderHeroStats() {
    const statsContainer = document.getElementById('hero-stats');
    if (!statsContainer) return;
    statsContainer.innerHTML = portfolioData.stats
      .map(
        (st) => `
        <div class="glass-card p-4 rounded-xl border border-white/10 hover:border-rose-500/30 transition flex flex-col justify-center">
          <div class="flex items-baseline gap-1">
            <span class="text-2xl lg:text-3xl font-extrabold text-white tracking-tight font-heading">${st.value}</span>
            <span class="text-xs font-semibold text-rose-400 font-mono">${st.suffix}</span>
          </div>
          <p class="text-xs text-zinc-400 mt-1 line-clamp-1">${currentLang === 'id' ? st.labelId : st.labelEn}</p>
        </div>
      `
      )
      .join('');
  }

  // Render About Pillars
  function renderAboutSection() {
    const aboutParas = document.getElementById('about-paragraphs');
    const aboutPillars = document.getElementById('about-pillars');
    if (aboutParas) {
      const paras = currentLang === 'id' ? portfolioData.about.paragraphsId : portfolioData.about.paragraphsEn;
      aboutParas.innerHTML = paras.map((p) => `<p class="leading-relaxed text-zinc-300">${p}</p>`).join('');
    }

    if (aboutPillars) {
      const pillars = currentLang === 'id' ? portfolioData.about.pillarsId : portfolioData.about.pillarsEn;
      aboutPillars.innerHTML = pillars
        .map(
          (pil) => `
          <div class="glass-card p-5 rounded-2xl border border-white/10 hover:border-rose-500/40 transition group">
            <div class="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-rose-500 group-hover:text-white transition duration-300">
              <i data-lucide="${pil.icon}" class="w-5 h-5"></i>
            </div>
            <h4 class="font-bold text-white text-base mb-1.5 font-heading">${pil.title}</h4>
            <p class="text-xs leading-relaxed text-zinc-400">${pil.desc}</p>
          </div>
        `
        )
        .join('');
    }
  }

  // Render Education
  function renderEducation() {
    const eduContainer = document.getElementById('education-list');
    if (!eduContainer) return;
    eduContainer.innerHTML = portfolioData.education
      .map(
        (edu) => `
        <div class="glass-card p-6 md:p-8 rounded-2xl border border-white/10 hover:border-amber-500/30 transition flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div class="relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden flex-shrink-0 border border-white/15 bg-zinc-900 shadow-md">
            <img src="${edu.image}" alt="${edu.institution}" class="w-full h-full object-cover object-top hover:scale-105 transition duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>
          <div class="flex-1">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span class="badge-pill text-amber-400 border-amber-500/20 bg-amber-500/10 font-mono">
                <i data-lucide="calendar" class="w-3 h-3"></i> ${edu.period}
              </span>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">
                ${edu.gpa}
              </span>
            </div>
            <h3 class="text-lg md:text-xl font-bold text-white font-heading">${edu.institution}</h3>
            <p class="text-sm font-medium text-rose-400 mt-0.5">${currentLang === 'id' ? edu.degreeId : edu.degreeEn}</p>
            <p class="text-xs text-zinc-400 mt-2 leading-relaxed">${currentLang === 'id' ? edu.descriptionId : edu.descriptionEn}</p>
            <div class="flex items-center gap-1.5 text-xs text-zinc-500 mt-3">
              <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
              <span>${edu.location}</span>
            </div>
          </div>
        </div>
      `
      )
      .join('');
  }

  // Render Experience Timeline
  function renderExperience() {
    const expContainer = document.getElementById('experience-timeline');
    if (!expContainer) return;
    expContainer.innerHTML = portfolioData.experience
      .map(
        (exp, idx) => `
        <div class="relative pl-8 md:pl-10 border-l border-zinc-800 pb-12 last:pb-2 group">
          <!-- Timeline Node -->
          <div class="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-zinc-950 border-2 border-rose-500 group-hover:scale-125 group-hover:bg-rose-500 transition duration-300"></div>

          <div class="glass-card p-6 md:p-8 rounded-2xl border border-white/10 hover:border-rose-500/30 transition">
            <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-4">
              <div>
                <span class="badge-pill text-xs text-rose-400 border-rose-500/30 bg-rose-500/10 font-mono mb-2">
                  ${exp.type}
                </span>
                <h3 class="text-xl md:text-2xl font-bold text-white font-heading mt-1">
                  ${currentLang === 'id' ? exp.roleId : exp.roleEn}
                </h3>
                <h4 class="text-base font-semibold text-zinc-300 flex items-center gap-2 mt-0.5">
                  <i data-lucide="building-2" class="w-4 h-4 text-rose-400"></i> ${exp.company}
                </h4>
              </div>

              <div class="text-left lg:text-right flex-shrink-0">
                <span class="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                  <i data-lucide="calendar" class="w-3.5 h-3.5 text-amber-400"></i> ${exp.period}
                </span>
                <p class="text-xs text-zinc-500 mt-1.5 flex items-center lg:justify-end gap-1">
                  <i data-lucide="map-pin" class="w-3 h-3"></i> ${exp.location}
                </p>
              </div>
            </div>

            <!-- Optional Office/Team Photo Banner -->
            ${
              exp.image
                ? `
              <div class="mb-5 rounded-xl overflow-hidden border border-white/10 max-h-56 relative group/img">
                <img src="${exp.image}" alt="${exp.company}" class="w-full h-full object-cover object-center group-hover/img:scale-105 transition duration-500" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                  <span class="text-xs text-zinc-300 font-mono">Documentation Photo: ${exp.company}</span>
                </div>
              </div>
            `
                : ''
            }

            <p class="text-sm text-zinc-300 mb-4 leading-relaxed font-medium">
              ${currentLang === 'id' ? exp.descriptionId : exp.descriptionEn}
            </p>

            <ul class="space-y-2.5 mb-6 text-sm text-zinc-400">
              ${(currentLang === 'id' ? exp.bulletsId : exp.bulletsEn)
                .map(
                  (b) => `
                <li class="flex items-start gap-2.5">
                  <i data-lucide="check-circle-2" class="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5"></i>
                  <span>${b}</span>
                </li>
              `
                )
                .join('')}
            </ul>

            <div class="flex flex-wrap gap-2 pt-2 border-t border-white/5">
              ${exp.techStack
                .map(
                  (t) => `
                <span class="text-xs font-mono px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5">
                  ${t}
                </span>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      `
      )
      .join('');
  }

  // Render Tech Stack Matrix
  function renderTechStack(filterCategory = 'all') {
    if (!techGrid) return;
    const filteredCategories =
      filterCategory === 'all'
        ? portfolioData.techStack
        : portfolioData.techStack.filter((cat) => cat.category === filterCategory);

    techGrid.innerHTML = filteredCategories
      .map(
        (category) => `
        <div class="glass-card p-6 rounded-2xl border border-white/10 hover:border-rose-500/20 transition flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
              <h3 class="text-lg font-bold text-white font-heading flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                ${currentLang === 'id' ? category.categoryNameId : category.categoryNameEn}
              </h3>
              <span class="text-xs font-mono text-zinc-400">${category.skills.length} Techs</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              ${category.skills
                .map(
                  (skill) => `
                <div class="p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-rose-500/30 hover:bg-white/[0.04] transition group/skill">
                  <div class="flex items-center justify-between mb-1">
                    <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center text-rose-400 group-hover/skill:text-amber-400 transition">
                        <i data-lucide="${skill.icon}" class="w-3.5 h-3.5"></i>
                      </div>
                      <span class="text-sm font-semibold text-white">${skill.name}</span>
                    </div>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      skill.level === 'Advanced' || skill.level === 'Expert'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                    }">${skill.level}</span>
                  </div>
                  <p class="text-[11px] text-zinc-400 leading-snug mt-1 pl-8">${skill.desc}</p>
                </div>
              `
                )
                .join('')}
            </div>
          </div>
        </div>
      `
      )
      .join('');
    refreshIcons();
  }

  // Render Projects Bento Grid
  function renderProjects(filterCategory = 'all') {
    if (!projectGrid) return;
    const filteredProjects =
      filterCategory === 'all'
        ? portfolioData.projects
        : portfolioData.projects.filter((p) => p.category === filterCategory);

    projectGrid.innerHTML = filteredProjects
      .map((proj, idx) => {
        const isSpecialResearch = proj.id === 'research-xgboost';
        const isFeatured = proj.featured;

        return `
        <div class="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-rose-500/40 transition duration-300 flex flex-col group ${
          isFeatured ? 'lg:col-span-2' : ''
        }">
          <!-- Card Image Thumbnail -->
          <div class="relative w-full overflow-hidden bg-zinc-950 border-b border-white/10 ${
            isFeatured ? 'h-64 sm:h-72 md:h-80' : 'h-52 sm:h-60'
          }">
            <img 
              src="${proj.image}" 
              alt="${proj.title}" 
              class="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500 cursor-pointer"
              onclick="window.openProjectModal('${proj.id}')"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent pointer-events-none"></div>

            <!-- Top Floating Badges -->
            <div class="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
              <span class="badge-pill bg-zinc-950/80 backdrop-blur-md text-rose-400 border-rose-500/30 font-mono shadow-lg">
                ${currentLang === 'id' ? proj.badgeId : proj.badgeEn}
              </span>
              <span class="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-zinc-300 border border-white/15 uppercase tracking-wider">
                ${proj.category}
              </span>
            </div>

            <!-- Quick Action Hover Pill -->
            <div class="absolute bottom-4 right-4 z-10">
              <button 
                onclick="window.openProjectModal('${proj.id}')"
                class="px-3.5 py-1.5 rounded-lg bg-rose-600/90 hover:bg-rose-600 text-white text-xs font-semibold shadow-lg backdrop-blur-sm flex items-center gap-1.5 transition transform hover:scale-105"
              >
                <span>${currentLang === 'id' ? 'Detail Proyek' : 'View Case Study'}</span>
                <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>

          <!-- Card Content Body -->
          <div class="p-6 md:p-7 flex-1 flex flex-col justify-between">
            <div>
              <h3 
                class="text-xl md:text-2xl font-bold text-white font-heading cursor-pointer hover:text-rose-400 transition"
                onclick="window.openProjectModal('${proj.id}')"
              >
                ${proj.title}
              </h3>
              <p class="text-sm text-zinc-400 mt-2 leading-relaxed">
                ${currentLang === 'id' ? proj.taglineId : proj.taglineEn}
              </p>

              ${
                isSpecialResearch && proj.researchMetrics
                  ? `
                <!-- Special Metric Highlight Box for XGBoost Research -->
                <div class="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                  <div class="flex items-center justify-between mb-2">
                    <span class="font-bold text-amber-300 font-mono flex items-center gap-1">
                      <i data-lucide="award" class="w-3.5 h-3.5"></i> Hasil Riset Utama (Best Metric)
                    </span>
                    <span class="font-extrabold text-amber-400 text-sm font-mono">${proj.researchMetrics.bestMetric}</span>
                  </div>
                  <p class="text-zinc-300 text-[11px]">
                    Item ID terbukti mengungguli One-Hot Encoding pada 4 metrik evaluasi (WAPE, MAE, RMSE, R²). Fitur Lag-1 paling dominan (±34%).
                  </p>
                </div>
              `
                  : ''
              }
            </div>

            <!-- Card Footer Tech Stack & Links -->
            <div class="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
              <div class="flex flex-wrap gap-1.5">
                ${proj.techStack
                  .slice(0, 4)
                  .map(
                    (tech) => `
                  <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-300 border border-white/5">
                    ${tech}
                  </span>
                `
                  )
                  .join('')}
                ${
                  proj.techStack.length > 4
                    ? `<span class="text-[10px] font-mono px-1.5 py-0.5 text-zinc-500">+${proj.techStack.length - 4}</span>`
                    : ''
                }
              </div>

              <div class="flex items-center gap-2">
                ${
                  proj.links.demo
                    ? `
                  <a 
                    href="${proj.links.demo}" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="text-xs font-semibold px-2.5 py-1 rounded ${
                      proj.links.demoType === 'playstore'
                        ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : proj.links.demoType === 'streamlit'
                        ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    } flex items-center gap-1.5 transition transform hover:scale-105"
                  >
                    <i data-lucide="${
                      proj.links.demoType === 'playstore'
                        ? 'smartphone'
                        : proj.links.demoType === 'streamlit'
                        ? 'activity'
                        : 'external-link'
                    }" class="w-3 h-3"></i>
                    <span>${
                      proj.links.demoType === 'playstore'
                        ? 'Play Store'
                        : proj.links.demoType === 'streamlit'
                        ? 'Streamlit App'
                        : (currentLang === 'id' ? 'Live Demo' : 'Live Web')
                    }</span>
                  </a>
                `
                    : ''
                }
                <button 
                  onclick="window.openProjectModal('${proj.id}')"
                  class="text-xs font-semibold px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10 flex items-center gap-1 transition"
                >
                  <i data-lucide="eye" class="w-3 h-3"></i>
                  <span>Inspect</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      })
      .join('');
    refreshIcons();
  }

  // Render Certificates Gallery
  function renderCertificates() {
    if (!certGrid) return;
    certGrid.innerHTML = portfolioData.certificates
      .map(
        (cert) => `
        <div 
          class="glass-card rounded-2xl overflow-hidden border border-white/10 hover:border-amber-500/40 transition duration-300 flex flex-col cursor-pointer group"
          onclick="window.openCertificateModal('${cert.id}')"
        >
          <div class="relative w-full h-44 bg-zinc-900 overflow-hidden border-b border-white/10">
            <img 
              src="${cert.image}" 
              alt="${cert.title}" 
              class="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500" 
            />
            <div class="absolute inset-0 bg-black/30 group-hover:bg-transparent transition duration-300"></div>
            <div class="absolute top-3 left-3">
              <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-amber-400 border border-amber-500/30">
                ${cert.type}
              </span>
            </div>
            <div class="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition duration-200">
              <span class="text-xs bg-zinc-950/90 text-white px-2 py-1 rounded-md border border-white/20 flex items-center gap-1 shadow">
                <i data-lucide="zoom-in" class="w-3 h-3"></i> Perbesar
              </span>
            </div>
          </div>
          <div class="p-4 flex-1 flex flex-col justify-between">
            <div>
              <h4 class="text-base font-bold text-white font-heading group-hover:text-amber-400 transition line-clamp-1">
                ${cert.title}
              </h4>
              <p class="text-xs font-semibold text-rose-400 mt-1">${cert.issuer}</p>
              <p class="text-[11px] text-zinc-400 mt-1.5 line-clamp-2">
                ${currentLang === 'id' ? cert.descriptionId : cert.descriptionEn}
              </p>
            </div>
            <div class="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span>${cert.date}</span>
              <span class="text-amber-400/80 flex items-center gap-0.5">
                <i data-lucide="shield-check" class="w-3 h-3"></i> Verified
              </span>
            </div>
          </div>
        </div>
      `
      )
      .join('');
    refreshIcons();
  }

  // --- 4. MODALS & LIGHTBOX ---
  window.openProjectModal = function (projectId) {
    const project = portfolioData.projects.find((p) => p.id === projectId);
    if (!project || !modalContainer || !modalContent) return;

    const isResearch = project.id === 'research-xgboost';

    modalContent.innerHTML = `
      <div class="p-6 md:p-8">
        <!-- Modal Header -->
        <div class="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <span class="badge-pill text-rose-400 border-rose-500/30 bg-rose-500/10 font-mono text-xs mb-2">
              ${currentLang === 'id' ? project.badgeId : project.badgeEn}
            </span>
            <h2 class="text-2xl md:text-3xl font-extrabold text-white font-heading mt-1">${project.title}</h2>
            <p class="text-sm text-zinc-400 mt-1">${currentLang === 'id' ? project.taglineId : project.taglineEn}</p>
          </div>
          <button 
            onclick="window.closeModal()" 
            class="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 flex items-center justify-center transition flex-shrink-0"
            aria-label="Close modal"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <!-- High-res Image Showcase -->
        <div class="my-6 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl max-h-[460px] flex items-center justify-center">
          <img src="${project.image}" alt="${project.title}" class="w-full h-auto max-h-[460px] object-contain" />
        </div>

        <!-- Project Overview -->
        <div class="space-y-6 text-zinc-300 text-sm leading-relaxed">
          <div>
            <h4 class="text-base font-bold text-white font-heading mb-2 flex items-center gap-2">
              <i data-lucide="info" class="w-4 h-4 text-rose-400"></i> ${currentLang === 'id' ? 'Gambaran Proyek' : 'Project Overview'}
            </h4>
            <p class="text-zinc-300">${currentLang === 'id' ? project.overviewId : project.overviewEn}</p>
          </div>

          <!-- Key Features -->
          <div>
            <h4 class="text-base font-bold text-white font-heading mb-3 flex items-center gap-2">
              <i data-lucide="sparkles" class="w-4 h-4 text-amber-400"></i> ${currentLang === 'id' ? 'Fitur Kunci & Implementasi' : 'Key Features & Implementation'}
            </h4>
            <ul class="space-y-2.5">
              ${(currentLang === 'id' ? project.featuresId : project.featuresEn)
                .map(
                  (f) => `
                <li class="flex items-start gap-2.5">
                  <i data-lucide="check" class="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5"></i>
                  <span>${f}</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>

          <!-- If XGBoost Research: Display Full Benchmark Table -->
          ${
            isResearch && project.researchMetrics
              ? `
            <div class="mt-6 p-5 rounded-2xl bg-zinc-900/90 border border-amber-500/30">
              <h4 class="text-base font-bold text-amber-400 font-heading mb-3 flex items-center gap-2">
                <i data-lucide="table" class="w-4 h-4"></i> Hasil Perbandingan Metrik: One-Hot vs Category Item ID
              </h4>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs font-mono border-collapse">
                  <thead>
                    <tr class="border-b border-white/10 text-zinc-400">
                      <th class="py-2.5 px-3">Metrik Evaluasi</th>
                      <th class="py-2.5 px-3">One-Hot Encoding</th>
                      <th class="py-2.5 px-3 text-emerald-400 font-bold">Category Item ID (Skripsi)</th>
                      <th class="py-2.5 px-3 text-rose-400">Kesimpulan</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-white/5 text-zinc-300">
                    ${project.researchMetrics.table
                      .map(
                        (row) => `
                      <tr class="hover:bg-white/[0.02]">
                        <td class="py-2.5 px-3 font-semibold text-white">${row.metric}</td>
                        <td class="py-2.5 px-3 text-zinc-400">${row.oneHot}</td>
                        <td class="py-2.5 px-3 text-emerald-300 font-bold bg-emerald-500/5">${row.itemId}</td>
                        <td class="py-2.5 px-3 text-amber-300">Lebih Akurat & Cepat</td>
                      </tr>
                    `
                      )
                      .join('')}
                  </tbody>
                </table>
              </div>
              <p class="text-[11px] text-zinc-400 mt-3 italic">
                *Analisis feature importance menunjukkan fitur penjualan minggu lalu (Lag-1) memberikan pengaruh dominan sebesar ±34%.
              </p>
            </div>
          `
              : ''
          }

          <!-- Tech Stack Tags -->
          <div>
            <h4 class="text-base font-bold text-white font-heading mb-2.5 flex items-center gap-2">
              <i data-lucide="code" class="w-4 h-4 text-cyan-400"></i> Tech Stack & Tools
            </h4>
            <div class="flex flex-wrap gap-2">
              ${project.techStack
                .map(
                  (t) => `
                <span class="text-xs font-mono px-3 py-1 rounded-lg bg-white/5 text-zinc-200 border border-white/10">
                  ${t}
                </span>
              `
                )
                .join('')}
            </div>
          </div>
        </div>

        <!-- Modal Actions Footer -->
        <div class="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            ${
              project.links.demo
                ? `
              <a 
                href="${project.links.demo}" 
                target="_blank" 
                rel="noopener noreferrer" 
                class="px-5 py-2.5 rounded-xl ${
                  project.links.demoType === 'playstore'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-600 text-white'
                    : project.links.demoType === 'streamlit'
                    ? 'bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold'
                    : 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold'
                } text-xs tracking-wide shadow-lg flex items-center gap-2 transition transform hover:scale-105"
              >
                <i data-lucide="${
                  project.links.demoType === 'playstore'
                    ? 'smartphone'
                    : project.links.demoType === 'streamlit'
                    ? 'activity'
                    : 'external-link'
                }" class="w-4 h-4"></i>
                <span>${
                  project.links.demoType === 'playstore'
                    ? (currentLang === 'id' ? 'Buka di Google Play Store' : 'Open in Google Play Store')
                    : project.links.demoType === 'streamlit'
                    ? (currentLang === 'id' ? 'Buka Dashboard Prediksi Streamlit' : 'Open Live Streamlit Dashboard')
                    : (currentLang === 'id' ? (project.links.demoLabelId || 'Kunjungi Website Live') : (project.links.demoLabelEn || 'Open Live Demo'))
                }</span>
              </a>
            `
                : ''
            }
            <a 
              href="${project.links.github}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wide border border-white/15 flex items-center gap-2 transition"
            >
              <i data-lucide="github" class="w-4 h-4"></i>
              <span>GitHub Profile</span>
            </a>
          </div>

          <button 
            onclick="window.closeModal()" 
            class="text-xs font-mono text-zinc-400 hover:text-white transition"
          >
            ${currentLang === 'id' ? 'Tutup [Esc]' : 'Close [Esc]'}
          </button>
        </div>
      </div>
    `;

    modalContainer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    refreshIcons();
  };

  window.openCertificateModal = function (certId) {
    const cert = portfolioData.certificates.find((c) => c.id === certId);
    if (!cert || !modalContainer || !modalContent) return;

    modalContent.innerHTML = `
      <div class="p-6 md:p-8">
        <div class="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <div>
            <span class="badge-pill text-amber-400 border-amber-500/30 bg-amber-500/10 font-mono text-xs mb-1">
              ${cert.type}
            </span>
            <h3 class="text-xl md:text-2xl font-bold text-white font-heading mt-1">${cert.title}</h3>
            <p class="text-xs font-semibold text-rose-400">${cert.issuer} • ${cert.date}</p>
          </div>
          <button 
            onclick="window.closeModal()" 
            class="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 flex items-center justify-center transition"
          >
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="rounded-xl overflow-hidden border border-white/15 bg-black/80 my-4 shadow-2xl flex items-center justify-center">
          <img src="${cert.image}" alt="${cert.title}" class="w-full h-auto max-h-[500px] object-contain" />
        </div>

        <p class="text-sm text-zinc-300 leading-relaxed mt-4">
          ${currentLang === 'id' ? cert.descriptionId : cert.descriptionEn}
        </p>

        <div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
          <span class="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <i data-lucide="check-circle" class="w-4 h-4"></i> Authentic & Verified Credential
          </span>
          <button 
            onclick="window.closeModal()" 
            class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
          >
            Tutup
          </button>
        </div>
      </div>
    `;

    modalContainer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    refreshIcons();
  };

  window.closeModal = function () {
    if (!modalContainer) return;
    modalContainer.classList.add('hidden');
    document.body.style.overflow = '';
  };

  // Close modal on background click
  if (modalContainer) {
    modalContainer.addEventListener('click', (e) => {
      if (e.target === modalContainer) {
        window.closeModal();
      }
    });
  }

  // Keyboard shortcut Esc to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      window.closeModal();
    }
  });

  // --- 5. BILINGUAL LANGUAGE SWITCHER ---
  function updateTextTranslations() {
    document.querySelectorAll('[data-i18n-id]').forEach((el) => {
      const idText = el.getAttribute('data-i18n-id');
      const enText = el.getAttribute('data-i18n-en');
      if (currentLang === 'id' && idText) {
        el.textContent = idText;
      } else if (currentLang === 'en' && enText) {
        el.textContent = enText;
      }
    });

    if (currentLangLabel) {
      currentLangLabel.textContent = currentLang.toUpperCase();
    }
  }

  function toggleLanguage() {
    currentLang = currentLang === 'id' ? 'en' : 'id';
    localStorage.setItem('agy_portfolio_lang', currentLang);
    renderAll();
    showToast(currentLang === 'id' ? 'Bahasa diubah ke Bahasa Indonesia' : 'Language switched to English');
  }

  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', toggleLanguage);
  }

  // --- 6. FILTER BUTTONS HANDLING ---
  function initFilterButtons() {
    // Project filter tabs
    document.querySelectorAll('.project-filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.project-filter-btn').forEach((b) => {
          b.classList.remove('active', 'bg-rose-500', 'text-white');
          b.classList.add('bg-white/5', 'text-zinc-400');
        });
        btn.classList.add('active', 'bg-rose-500', 'text-white');
        btn.classList.remove('bg-white/5', 'text-zinc-400');
        activeProjectFilter = btn.getAttribute('data-filter') || 'all';
        renderProjects(activeProjectFilter);
      });
    });

    // Tech stack filter tabs
    document.querySelectorAll('.tech-filter-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tech-filter-btn').forEach((b) => {
          b.classList.remove('active', 'bg-rose-500', 'text-white');
          b.classList.add('bg-white/5', 'text-zinc-400');
        });
        btn.classList.add('active', 'bg-rose-500', 'text-white');
        btn.classList.remove('bg-white/5', 'text-zinc-400');
        activeTechFilter = btn.getAttribute('data-filter') || 'all';
        renderTechStack(activeTechFilter);
      });
    });
  }

  // --- 7. INTERACTIVE TERMINAL EASTER EGG ---
  function initTerminal() {
    const input = document.getElementById('terminal-input');
    const output = document.getElementById('terminal-output');
    if (!input || !output) return;

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = input.value.trim().toLowerCase();
        input.value = '';
        executeTerminalCommand(val, output);
      }
    });
  }

  function executeTerminalCommand(cmd, output) {
    const row = document.createElement('div');
    row.className = 'mt-2';

    let response = '';
    switch (cmd) {
      case 'help':
        response = `
          <div class="text-zinc-300">
            <span class="text-amber-400 font-bold">Available Commands:</span><br/>
            • <span class="text-rose-400">about</span>    : Ringkasan profil Agung Deriko Nainggolan<br/>
            • <span class="text-rose-400">skills</span>   : Daftar keahlian frontend & mobile<br/>
            • <span class="text-rose-400">projects</span> : Daftar portofolio aplikasi & riset<br/>
            • <span class="text-rose-400">stats</span>    : IPK, capaian riset XGBoost & pengalaman<br/>
            • <span class="text-rose-400">contact</span>  : Email, nomor WhatsApp, GitHub, LinkedIn<br/>
            • <span class="text-rose-400">clear</span>    : Bersihkan layar terminal
          </div>
        `;
        break;
      case 'about':
        response = `
          <div class="text-zinc-300">
            <span class="text-emerald-400 font-bold">Agung Deriko Nainggolan</span><br/>
            Lulusan D4 Teknik Informatika Universitas Logistik dan Bisnis Internasional (ULBI), IPK 3.67/4.00.<br/>
            Spesialisasi Frontend (React, JS, Tailwind) & Mobile (Flutter, FlutterFlow).
          </div>
        `;
        break;
      case 'skills':
        response = `
          <div class="text-zinc-300">
            • <span class="text-cyan-400">Frontend:</span> React JS, JavaScript (ES6+), Tailwind CSS, Bootstrap, HTML5/CSS3<br/>
            • <span class="text-cyan-400">Mobile:</span> Flutter, Dart, FlutterFlow, Android Studio<br/>
            • <span class="text-cyan-400">Backend & DB:</span> Go (Golang), PHP, MySQL, PostgreSQL, MongoDB<br/>
            • <span class="text-cyan-400">Workflow & ML:</span> Git, Postman, Firebase (FCM), XGBoost, Streamlit
          </div>
        `;
        break;
      case 'projects':
        response = `
          <div class="text-zinc-300 space-y-1.5">
            <div>1. <span class="text-rose-400 font-bold">SyncroApp:</span> <a href="https://syncroapp.github.io/login/" target="_blank" rel="noopener noreferrer" class="text-sky-400 underline hover:text-sky-300">https://syncroapp.github.io/login/</a></div>
            <div>2. <span class="text-rose-400 font-bold">Chicken Holic:</span> <a href="https://play.google.com/store/apps/details?id=com.chickenholic.app" target="_blank" rel="noopener noreferrer" class="text-emerald-400 underline hover:text-emerald-300">Google Play Store</a></div>
            <div>3. <span class="text-rose-400 font-bold">Legend Badminton:</span> <a href="https://legendbadminton.com/" target="_blank" rel="noopener noreferrer" class="text-amber-400 underline hover:text-amber-300">https://legendbadminton.com/</a></div>
            <div>4. <span class="text-rose-400 font-bold">Sampahku:</span> <a href="https://sampahkudev.github.io/landing-page/" target="_blank" rel="noopener noreferrer" class="text-teal-400 underline hover:text-teal-300">https://sampahkudev.github.io/landing-page/</a></div>
            <div>5. <span class="text-rose-400 font-bold">Penelitian XGBoost:</span> <a href="https://qtskxoh94pb2sybdhca9sr.streamlit.app/" target="_blank" rel="noopener noreferrer" class="text-purple-400 underline hover:text-purple-300">Streamlit Dashboard</a></div>
          </div>
        `;
        break;
      case 'stats':
        response = `
          <div class="text-zinc-300">
            • IPK: <span class="text-emerald-400 font-bold">3.67 / 4.00</span> (D4 Teknik Informatika ULBI)<br/>
            • Internship: <span class="text-amber-400 font-bold">4 Bulan</span> di CV Digisolf Technology Consulting<br/>
            • Akurasi Riset XGBoost: <span class="text-rose-400 font-bold">WAPE 16.36%</span> (Item ID vs One-Hot)<br/>
            • TOEIC Score: <span class="text-cyan-400 font-bold">655</span> | TOEFL: <span class="text-cyan-400 font-bold">480</span>
          </div>
        `;
        break;
      case 'contact':
        response = `
          <div class="text-zinc-300">
            • Email: <a href="mailto:agung.nainggolan8008@gmail.com" class="text-rose-400 underline">agung.nainggolan8008@gmail.com</a><br/>
            • WhatsApp: <a href="https://wa.me/6282360711385" target="_blank" class="text-emerald-400 underline">+62 823-6071-1385</a><br/>
            • GitHub: <a href="https://github.com/agung6544" target="_blank" class="text-sky-400 underline">github.com/agung6544</a><br/>
            • LinkedIn: <span class="text-blue-400">Agung Deriko Nainggolan</span>
          </div>
        `;
        break;
      case 'clear':
        output.innerHTML = '';
        return;
      case '':
        return;
      default:
        response = `<span class="text-rose-400">Command not recognized: '${cmd}'. Ketik '<span class="text-white font-bold">help</span>' untuk melihat daftar perintah.</span>`;
    }

    row.innerHTML = `
      <div class="flex items-center gap-2 text-zinc-500 font-mono text-xs">
        <span class="text-rose-400">agung@portfolio</span>:<span class="text-amber-400">~</span>$ <span class="text-white">${cmd}</span>
      </div>
      <div class="pl-4 mt-1 text-xs font-mono">${response}</div>
    `;

    output.appendChild(row);
    output.scrollTop = output.scrollHeight;
  }

  // --- 8. SMOOTH SCROLL SPY & NAVBAR BLUR ---
  function initNavScroll() {
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;

      if (navbar) {
        if (scrollY > 50) {
          navbar.classList.add('bg-zinc-950/80', 'backdrop-blur-xl', 'border-white/10', 'shadow-2xl');
          navbar.classList.remove('bg-transparent', 'border-transparent');
        } else {
          navbar.classList.remove('bg-zinc-950/80', 'backdrop-blur-xl', 'border-white/10', 'shadow-2xl');
          navbar.classList.add('bg-transparent', 'border-transparent');
        }
      }

      sections.forEach((sec) => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach((link) => {
            link.classList.remove('text-rose-400');
            link.classList.add('text-zinc-400');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('text-rose-400');
              link.classList.remove('text-zinc-400');
            }
          });
        }
      });
    });
  }

  // --- 9. MOBILE MENU TOGGLE ---
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // --- 10. INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initSpotlight();
    renderAll();
    initFilterButtons();
    initTerminal();
    initNavScroll();
    initMobileMenu();
  });
})();

