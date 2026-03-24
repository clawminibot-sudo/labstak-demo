/**
 * LABSTAK SHARED COMPONENTS
 * Injects: password gate, sidebar, header actions (theme toggle, bell, search)
 * Manages: theme, sidebar collapse, nav highlighting
 *
 * Usage:
 *   <script src="shared.js"></script>
 *   <script>
 *     LabstakShared.init({
 *       page: 'samples',                              // nav item to highlight
 *       title: 'Samples Pipeline',                    // header title (optional, overridden by page)
 *       spaPages: ['dashboard','packages','connections'] // only for app.html
 *     });
 *   </script>
 */
(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════
  // PASSWORD GATE
  // ══════════════════════════════════════════════════════════════
  function injectGate() {
    if (sessionStorage.getItem('ls_auth') === '1') return;

    var gate = document.createElement('div');
    gate.id = 'gate';
    gate.style.cssText = 'position:fixed;inset:0;z-index:9999;background:#0B0D12;display:flex;align-items:center;justify-content:center;font-family:"Inter",sans-serif;';
    gate.innerHTML =
      '<div style="text-align:center;max-width:340px;padding:24px;">' +
        '<div style="margin-bottom:24px;">' +
          '<div style="width:48px;height:48px;background:#10B981;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px;">' +
            '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>' +
          '</div>' +
          '<h2 style="font-size:1.25rem;margin-bottom:4px;color:#EAEDF2;">Labstak</h2>' +
          '<p style="font-size:0.85rem;color:#5C6578;">Enter password to continue</p>' +
        '</div>' +
        '<input id="gate-input" type="password" placeholder="Password" autocomplete="off" style="' +
          'width:100%;padding:12px 16px;border-radius:8px;border:1px solid rgba(255,255,255,0.10);' +
          'background:#141720;color:#EAEDF2;font-family:\'Inter\',sans-serif;font-size:1rem;' +
          'outline:none;margin-bottom:12px;text-align:center;letter-spacing:0.05em;">' +
        '<button id="gate-btn" style="' +
          'width:100%;padding:12px;border-radius:8px;border:none;' +
          'background:#10B981;color:#fff;font-family:\'Inter\',sans-serif;font-size:0.95rem;font-weight:600;cursor:pointer;">' +
          'Continue</button>' +
        '<p id="gate-error" style="font-size:0.8rem;color:#F87171;margin-top:10px;display:none;">Incorrect password</p>' +
      '</div>';

    document.body.insertBefore(gate, document.body.firstChild);

    function tryAuth() {
      var input = document.getElementById('gate-input');
      if (input.value === 'MVP2026') {
        sessionStorage.setItem('ls_auth', '1');
        gate.style.display = 'none';
      } else {
        document.getElementById('gate-error').style.display = 'block';
        input.value = '';
        input.focus();
      }
    }

    document.getElementById('gate-btn').onclick = tryAuth;
    document.getElementById('gate-input').onkeydown = function (e) {
      if (e.key === 'Enter') tryAuth();
    };
    document.getElementById('gate-input').focus();
  }

  // ══════════════════════════════════════════════════════════════
  // SIDEBAR HTML
  // ══════════════════════════════════════════════════════════════
  var sidebarHTML =
    '<div class="logo">' +
      '<div class="logo-mark">' +
        '<svg viewBox="0 0 24 24" fill="white"><path d="M4 6a2 2 0 012-2h12a2 2 0 012 2v1a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm0 5.5A1.5 1.5 0 015.5 10h13a1.5 1.5 0 011.5 1.5v1a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 12.5v-1zM4 17a2 2 0 012-2h12a2 2 0 012 2v1a2 2 0 01-2 2H6a2 2 0 01-2-2v-1z"/></svg>' +
      '</div>' +
      '<span class="logo-text">LABSTAK</span>' +
    '</div>' +

    '<div class="nav-section">' +
      '<div class="nav-label">Overview</div>' +
      '<a class="nav-item" data-nav="dashboard" href="app.html#dashboard">' +
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' +
        '<span class="nav-text">Dashboard</span>' +
      '</a>' +
      '<a class="nav-item" data-nav="packages" href="app.html#packages">' +
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>' +
        '<span class="nav-text">Packages</span>' +
        '<span class="nav-badge green">147</span>' +
      '</a>' +
      '<a class="nav-item" data-nav="samples" href="samples.html">' +
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>' +
        '<span class="nav-text">Samples</span>' +
      '</a>' +
    '</div>' +

    '<div class="nav-section">' +
      '<div class="nav-label">Analytics</div>' +
      '<a class="nav-item" data-nav="trends" href="trends.html">' +
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' +
        '<span class="nav-text">Trends</span>' +
      '</a>' +
      '<a class="nav-item" data-nav="reports" href="reports.html">' +
        '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>' +
        '<span class="nav-text">Reports</span>' +
      '</a>' +
    '</div>' +

    '<div class="nav-section">' +
      '<div class="nav-label">Labs</div>' +
      '<a class="lab-item" data-nav="lab-delta" href="lab-profile.html?lab=delta">' +
        '<span class="lab-dot"></span>' +
        '<span class="lab-name">Delta Testing Co</span>' +
      '</a>' +
      '<a class="lab-item" data-nav="lab-southern" href="lab-profile.html?lab=southern">' +
        '<span class="lab-dot"></span>' +
        '<span class="lab-name">Southern Analytical</span>' +
      '</a>' +
      '<a class="lab-add" href="onboarding-wizard.html">' +
        '<span class="lab-add-icon">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>' +
        '</span>' +
        '<span>Add Lab</span>' +
      '</a>' +
    '</div>' +

    '<div class="sidebar-footer">' +
      '<div class="nav-section" style="padding-bottom:0">' +
        '<div class="nav-label">Settings</div>' +
        '<a class="nav-item" data-nav="connections" href="app.html#connections">' +
          '<svg class="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"/><circle cx="12" cy="12" r="3"/></svg>' +
          '<span class="nav-text">Connections</span>' +
        '</a>' +
      '</div>' +
      '<div class="sidebar-divider"></div>' +
      '<button class="collapse-btn" id="collapseBtn" onclick="toggleSidebar()">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>' +
        '<span class="collapse-label">Collapse</span>' +
      '</button>' +
      '<div class="sidebar-divider"></div>' +
      '<div class="user-section">' +
        '<div class="user-avatar">D</div>' +
        '<div class="user-info">' +
          '<div class="user-name">Delta Farms</div>' +
          '<div class="user-role">Pro Plan</div>' +
        '</div>' +
      '</div>' +
    '</div>';

  // ══════════════════════════════════════════════════════════════
  // HEADER ACTIONS HTML (theme toggle, bell, search bar)
  // ══════════════════════════════════════════════════════════════
  var headerActionsHTML =
    '<button class="theme-toggle" onclick="toggleTheme()" title="Toggle light/dark mode">' +
      '<svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>' +
      '<svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>' +
    '</button>' +
    '<div class="header-bell">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>' +
      '<span class="bell-dot"></span>' +
    '</div>' +
    '<div class="search-bar">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>' +
      '<span class="search-text">Search...</span>' +
      '<span class="search-kbd">⌘K</span>' +
    '</div>';

  // ══════════════════════════════════════════════════════════════
  // THEME TOGGLE (global)
  // ══════════════════════════════════════════════════════════════
  window.toggleTheme = function () {
    var current = document.documentElement.getAttribute('data-theme');
    var next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('ls-theme', next);
  };

  // ══════════════════════════════════════════════════════════════
  // SIDEBAR TOGGLE (global)
  // ══════════════════════════════════════════════════════════════
  window.toggleSidebar = function () {
    var sidebar = document.getElementById('sidebar');
    var main = document.getElementById('main');
    sidebar.classList.toggle('collapsed');
    main.classList.toggle('shifted');
    localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
  };

  // ══════════════════════════════════════════════════════════════
  // SET ACTIVE NAV (can be called externally, e.g. from SPA router)
  // ══════════════════════════════════════════════════════════════
  function setActiveNav(page) {
    var sidebar = document.getElementById('sidebar');
    if (!sidebar) return;
    // Clear all active
    sidebar.querySelectorAll('.nav-item, .lab-item').forEach(function (el) {
      el.classList.remove('active');
    });
    // Set active
    var target = sidebar.querySelector('[data-nav="' + page + '"]');
    if (target) target.classList.add('active');
  }

  // ══════════════════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════════════════
  var LabstakShared = {
    init: function (config) {
      config = config || {};

      // 1. Apply saved theme
      var savedTheme = localStorage.getItem('ls-theme') || 'dark';
      if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
      }

      // 2. Inject password gate
      injectGate();

      // 3. Inject sidebar
      var sidebar = document.getElementById('sidebar');
      if (!sidebar) {
        sidebar = document.createElement('aside');
        sidebar.className = 'sidebar';
        sidebar.id = 'sidebar';
        document.body.insertBefore(sidebar, document.body.firstChild);
      }
      sidebar.innerHTML = sidebarHTML;

      // 4. Restore sidebar collapsed state
      if (localStorage.getItem('sidebar-collapsed') === 'true') {
        sidebar.classList.add('collapsed');
        var main = document.getElementById('main');
        if (main) main.classList.add('shifted');
      }

      // 5. Set active nav
      if (config.page) {
        setActiveNav(config.page);
      }

      // 6. Inject header actions (theme toggle, bell, search)
      var headerActions = document.getElementById('header-actions');
      if (headerActions) {
        headerActions.innerHTML = headerActionsHTML;
      }

      // 7. Handle SPA nav interception (for app.html)
      if (config.spaPages && config.spaPages.length > 0) {
        config.spaPages.forEach(function (spaPage) {
          var navItem = sidebar.querySelector('[data-nav="' + spaPage + '"]');
          if (navItem) {
            navItem.addEventListener('click', function (e) {
              e.preventDefault();
              if (typeof window.navigate === 'function') {
                window.navigate(spaPage);
              }
            });
          }
        });
      }
    },

    // Public API to update active state (for SPA routing)
    setActive: setActiveNav
  };

  window.LabstakShared = LabstakShared;
})();
