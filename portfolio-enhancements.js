(() => {
  const profileBase = 'https://www.linkedin.com/in/sibu-stephen-841b6353';
  const education = [
    { years: '2013–2015', degree: 'Master of Science (M.Sc.), Computer Science', school: 'Symbiosis Institute of Computer Studies and Research', url: 'https://www.sicsr.ac.in/' },
    { years: '2010–2013', degree: 'Bachelor in Computer Application', school: 'Wadia College, Pune University', url: 'https://nowrosjeewadiacollege.edu.in/' }
  ];
  const certs = [
    ['LearnTube.ai','Learntube','Apr 2024','PRO-C-3-343177-0','Project Management'],
    ['GrowthSchool','Product Management','Mar 2024 · Expires Dec 2034','12c1c42f-f99b-4eb6-8334-1d4925a39017','Product Management · Product Owner'],
    ['GrowthSchool','Case Study Marathon','2024','',''],
    ['SAFe by Scaled Agile, Inc.','Certified SAFe® 6 Agilist','Mar 2024 · Expired Mar 2026','',''],
    ['HubSpot Academy','HubSpot CMS for Developers','Mar 2024 · Expired Apr 2025','99e2dfee937e4436bfddf6c5781e1319',''],
    ['Scrum Alliance','Certified Scrum Product Owner (CSPO)','Jun 2023 · Expired Jun 2026','1802931','Interpersonal Skills'],
    ['Scrum Alliance','Certified ScrumMaster (CSM)','Jun 2023 · Expired Jun 2026','001534740','Interpersonal Skills · Scrum'],
    ['Indian Institute of Management Rohtak','IIM Rohtak Project Management','Nov 2021','IIM-R/2021/eMDP/PM-X/05','Interpersonal Skills'],
    ['Interaction Design Foundation','Become a UX Designer from Scratch','Sep 2021','111105',''],
    ['Interaction Design Foundation','Dynamic User Experience: Design and Usability','Sep 2021','111105',''],
    ['Acquia','Drupal 9 Front End Specialist','Jun 2021','',''],
    ['Acquia','Cohesion Site Builder','Apr 2020','',''],
    ['Acquia','Drupal 8 Front End Specialist','Apr 2019','',''],
    ['mypath io','CSS Beginner — Score 24%','Nov 2015','',''],
    ['NIIT Limited','Developing ASP.NET MVC Web Applications','Aug 2012','12DVZZZZZ2464','']
  ];
  const socials = [
    ['LinkedIn', profileBase + '/'],
    ['Medium','https://medium.com/@sibustephen_55060'],
    ['GitHub · sibStephen','https://github.com/sibStephen'],
    ['GitHub · SibuStephen','https://github.com/SibuStephen'],
    ['Drupal GitLab · Intent UI','https://git.drupalcode.org/project/intentui'],
    ['Drupal.org','https://www.drupal.org/u/sibustephen'],
    ['Drupal module · SCIE','https://www.drupal.org/project/scie'],
    ['Behance','https://www.behance.net/sibustephen'],
    ['DZone','https://dzone.com/users/2999458/sibustephen.html'],
    ['Highcharts work','https://highchartsexport.wordpress.com/'],
    ['Marvel prototype','https://marvelapp.com/prototype/9156454/screen/43877127'],
    ['SoundCloud','https://soundcloud.com/sibu-stephen']
  ];
  const images = ['sibu-profile1.jpg','sibu-profile2.jpg','sibu-profile3.jpg','sibu-profile4.jpg','sibu-profile5.jpg','graphic-design.jpg','front-end.png','terminal.png','crop-image.png','symphony.png'];

  const asset = name => `./${name}`;

  function buildSection() {
    const section = document.createElement('section');
    section.id = 'credentials';
    section.className = 'enh-section';
    section.innerHTML = `
      <div class="enh-shell">
        <p class="enh-kicker">03 · Education, certifications and portfolio</p>
        <h2>Education and certifications</h2>
        <div class="enh-education">${education.map(e => `<a href="${e.url}" target="_blank" rel="noopener noreferrer"><span>${e.years}</span><h3>${e.degree}</h3><p>${e.school}</p><b>Visit institution ↗</b></a>`).join('')}</div>
        <h3 class="enh-subtitle">Licenses & certifications</h3>
        <div class="enh-certs">${certs.map(c => `<a href="${profileBase}/details/certifications/" target="_blank" rel="noopener noreferrer"><div class="enh-logo">${c[0].slice(0,2).toUpperCase()}</div><div><small>${c[0]}</small><h3>${c[1]}</h3><p>${c[2]}</p>${c[3] ? `<p>Credential ID: ${c[3]}</p>` : ''}${c[4] ? `<span>${c[4]}</span>` : ''}<b>View credential ↗</b></div></a>`).join('')}</div>
        <h3 class="enh-subtitle">Portfolio gallery</h3>
        <div class="enh-gallery">${images.map((img,i) => `<a href="${asset(img)}" target="_blank" rel="noopener noreferrer"><img src="${asset(img)}" alt="${i < 5 ? 'Sibu Stephen profile image' : 'Portfolio project image'} ${i+1}" loading="lazy"></a>`).join('')}</div>
        <h3 class="enh-subtitle">Find me online</h3>
        <div class="enh-links">${socials.map(s => `<a href="${s[1]}" target="_blank" rel="me noopener noreferrer">${s[0]} <span>↗</span></a>`).join('')}</div>
      </div>`;
    return section;
  }

  function render() {
    const root = document.querySelector('#root');
    if (!root) return false;
    const existing = document.querySelector('#credentials');
    const replacement = buildSection();
    if (existing) {
      existing.replaceWith(replacement);
    } else {
      const talks = document.querySelector('#talks');
      const main = document.querySelector('main') || root;
      if (talks && talks.parentNode) talks.parentNode.insertBefore(replacement, talks);
      else main.appendChild(replacement);
    }
    const nav = document.querySelector('nav');
    if (nav && !nav.querySelector('a[href="#credentials"]')) {
      const a = document.createElement('a');
      a.href = '#credentials';
      a.textContent = 'Credentials';
      nav.appendChild(a);
    }
    return true;
  }

  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    if (render() || attempts > 30) clearInterval(timer);
  }, 250);
})();
