export type LanguageCode = 'tr' | 'en' | 'de' | 'es' | 'fr';

export interface TranslationSchema {
  appTitle: string;
  subtitle: string;
  usernamePlaceholder: string;
  themeLabel: string;
  languageLabel: string;
  cardTitles: {
    profileStats: string;
    topLangs: string;
    streakStats: string;
    typingSvg: string;
    repoStats: string;
    activityGraph: string;
    trophies: string;
  };
  userLabel: string;
  activeCardsLabel: string;
  downloadSvg: string;
  copyMarkdown: string;
  copyHtml: string;
  copyUrl: string;
  copied: string;
  footerDevBy: string;
  navStats: string;
  navIcons: string;
  navReadme: string;
  iconLibrary: {
    title: string;
    subtitle: string;
    formatLabel: string;
    styleLabel: string;
    searchPlaceholder: string;
    categories: {
      all: string;
      social: string;
      languages: string;
      tech: string;
      tools: string;
    };
    formats: {
      skillicons: string;
      full: string;
      iconOnly: string;
      devicon: string;
    };
    styles: {
      modernLarge: string;
      flatMinimal: string;
      square: string;
      classic3d: string;
    };
    stripTitle: string;
    stripSubtitle: string;
    stripThemeDark: string;
    stripThemeLight: string;
    stripClear: string;
    stripSelectedCount: string;
    addLinkBtn: string;
    addToStripBtn: string;
    addedToStripBtn: string;
    modalTitle: string;
    usernameLabel: string;
    usernamePlaceholder: string;
    generatedLink: string;
    copyMarkdown: string;
    copyHtml: string;
  };
  readmeGenerator: {
    title: string;
    subtitle: string;
    copyTemplate: string;
    downloadFile: string;
    sections: {
      personalInfo: string;
      aboutMe: string;
      socialLinks: string;
      statsSelection: string;
    };
    labels: {
      githubUsername: string;
      bioText: string;
      includeTypingHeader: string;
      includeStats: string;
      includeStreak: string;
      includeTopLangs: string;
      includeActivity: string;
      includeTrophies: string;
      includeSkills: string;
    };
    previewTab: string;
    codeTab: string;
  };
}

export const LANGUAGES = [
  { code: 'tr' as const, name: 'Türkçe', flag: 'TR' },
  { code: 'en' as const, name: 'English', flag: 'EN' },
  { code: 'de' as const, name: 'Deutsch', flag: 'DE' },
  { code: 'es' as const, name: 'Español', flag: 'ES' },
  { code: 'fr' as const, name: 'Français', flag: 'FR' },
];

export const TRANSLATIONS: Record<LanguageCode, TranslationSchema> = {
  tr: {
    appTitle: 'Github Stats Generator',
    subtitle: 'GitHub profiliniz için dinamik, yüksek performanslı istatistik kartları ve ikonlar oluşturun.',
    usernamePlaceholder: 'GitHub kullanıcı adı girin...',
    themeLabel: 'Tema Seçin',
    languageLabel: 'Dil Seçin',
    cardTitles: {
      profileStats: 'Profil İstatistikleri',
      topLangs: 'En Çok Kullanılan Diller',
      streakStats: 'Katkı Serisi',
      typingSvg: 'Animasyonlu Başlık Kartı',
      repoStats: 'Öne Çıkarılan Depo İstatistikleri',
      activityGraph: 'Katkı Grafiği',
      trophies: 'GitHub Başarımları',
    },
    userLabel: 'Kullanıcı',
    activeCardsLabel: 'Aktif Kart',
    downloadSvg: 'SVG İndir',
    copyMarkdown: 'Markdown',
    copyHtml: 'HTML',
    copyUrl: 'URL',
    copied: 'Kopyalandı',
    footerDevBy: 'Dev by kroxly',
    navStats: 'İstatistik Kartları',
    navIcons: 'Rozet & İkon Kütüphanesi',
    navReadme: 'README Şablon Oluşturucu',
    iconLibrary: {
      title: 'Rozet & İkon Kataloğu',
      subtitle: 'GitHub profiliniz için rozetler, 1:1 kare ikonlar ve vektör logolar.',
      formatLabel: 'Format:',
      styleLabel: 'Rozet Stili:',
      searchPlaceholder: 'İkon veya teknoloji arayın (ör: Instagram, React, Python, LinkedIn)...',
      categories: {
        all: 'Tümü',
        social: 'Sosyal Medya',
        languages: 'Yazılım Dilleri',
        tech: 'Teknolojiler & Frameworks',
        tools: 'Programlar & Araçlar',
      },
      formats: {
        skillicons: 'SkillIcons (1:1)',
        full: 'Yatay Rozet',
        iconOnly: '1:1 Kare Shield',
        devicon: '1:1 Vektör Logo',
      },
      styles: {
        modernLarge: 'Modern Large',
        flatMinimal: 'Flat Minimal',
        square: 'Square',
        classic3d: 'Classic 3D',
      },
      stripTitle: 'SkillIcons.dev Çoklu İkon Şeridi Oluşturucu',
      stripSubtitle: 'İkonlara tıklayarak kendi beceri şeridinizi oluşturun ve README profilinize ekleyin.',
      stripThemeDark: 'Koyu (Dark)',
      stripThemeLight: 'Açık (Light)',
      stripClear: 'Temizle',
      stripSelectedCount: 'Seçilen İkon:',
      addLinkBtn: 'Link Ekle',
      addToStripBtn: 'SkillIcons Şeridine de Ekle',
      addedToStripBtn: 'SkillIcons Şeridine Eklendi',
      modalTitle: 'Profil Linki Bağla',
      usernameLabel: 'Kullanıcı Adınız:',
      usernamePlaceholder: 'kullanici_adi',
      generatedLink: 'Oluşan Link:',
      copyMarkdown: 'Markdown Kopyala',
      copyHtml: 'HTML Kopyala',
    },
    readmeGenerator: {
      title: 'Hazır README Profil Şablonu Oluşturucu',
      subtitle: 'Tüm kartlarınızı, becerilerinizi ve profil detaylarınızı tek tıkla eksiksiz bir README.md şablonuna dönüştürün.',
      copyTemplate: 'README.md Kopyala',
      downloadFile: 'README.md İndir',
      sections: {
        personalInfo: 'Kişisel Bilgiler & Ayarlar',
        aboutMe: 'Hakkımda Metni',
        socialLinks: 'Sosyal Medya Bağlantıları',
        statsSelection: 'Dahil Edilecek Kartlar',
      },
      labels: {
        githubUsername: 'GitHub Kullanıcı Adı',
        bioText: 'Profil Biyografiniz',
        includeTypingHeader: 'Animasyonlu Başlık (Typing SVG)',
        includeStats: 'Profil İstatistik Kartı',
        includeStreak: 'Katkı Serisi Kartı',
        includeTopLangs: 'En Çok Kullanılan Diller Kartı',
        includeActivity: 'Katkı Grafiği Kartı',
        includeTrophies: 'GitHub Başarım Rozetleri',
        includeSkills: 'SkillIcons Beceri Şeridi',
      },
      previewTab: 'Canlı Önizleme',
      codeTab: 'Markdown Kodu',
    },
  },
  en: {
    appTitle: 'Github Stats Generator',
    subtitle: 'Generate dynamic, high-performance statistics cards and badges for your GitHub profile.',
    usernamePlaceholder: 'Enter GitHub username...',
    themeLabel: 'Select Theme',
    languageLabel: 'Select Language',
    cardTitles: {
      profileStats: 'Profile Statistics',
      topLangs: 'Top Languages',
      streakStats: 'Streak Statistics',
      typingSvg: 'Animated Header Card',
      repoStats: 'Pinned Repository Stats',
      activityGraph: 'Activity Graph',
      trophies: 'GitHub Trophies',
    },
    userLabel: 'User',
    activeCardsLabel: 'Active Cards',
    downloadSvg: 'Download SVG',
    copyMarkdown: 'Markdown',
    copyHtml: 'HTML',
    copyUrl: 'URL',
    copied: 'Copied',
    footerDevBy: 'Dev by kroxly',
    navStats: 'Stats Cards',
    navIcons: 'Badges & Icons Library',
    navReadme: 'README Generator',
    iconLibrary: {
      title: 'Badges & Icons Catalog',
      subtitle: 'Badges, 1:1 square icons, and vector logos for your GitHub profile.',
      formatLabel: 'Format:',
      styleLabel: 'Badge Style:',
      searchPlaceholder: 'Search icon or tech (e.g., Instagram, React, Python, LinkedIn)...',
      categories: {
        all: 'All',
        social: 'Social Media',
        languages: 'Programming Languages',
        tech: 'Technologies & Frameworks',
        tools: 'Tools & Programs',
      },
      formats: {
        skillicons: 'SkillIcons (1:1)',
        full: 'Horizontal Badge',
        iconOnly: '1:1 Square Shield',
        devicon: '1:1 Vector Logo',
      },
      styles: {
        modernLarge: 'Modern Large',
        flatMinimal: 'Flat Minimal',
        square: 'Square',
        classic3d: 'Classic 3D',
      },
      stripTitle: 'SkillIcons.dev Multi-Icon Strip Generator',
      stripSubtitle: 'Click icons below to build your custom skills strip for your README profile.',
      stripThemeDark: 'Dark',
      stripThemeLight: 'Light',
      stripClear: 'Clear',
      stripSelectedCount: 'Selected Icons:',
      addLinkBtn: 'Add Link',
      addToStripBtn: 'Add to SkillIcons Strip',
      addedToStripBtn: 'Added to SkillIcons Strip',
      modalTitle: 'Connect Profile Link',
      usernameLabel: 'Your Username:',
      usernamePlaceholder: 'username',
      generatedLink: 'Generated Link:',
      copyMarkdown: 'Copy Markdown',
      copyHtml: 'Copy HTML',
    },
    readmeGenerator: {
      title: 'README Profile Template Generator',
      subtitle: 'Turn all your stats cards, skills, and profile details into a complete README.md template with one click.',
      copyTemplate: 'Copy README.md',
      downloadFile: 'Download README.md',
      sections: {
        personalInfo: 'Personal Info & Settings',
        aboutMe: 'About Me Bio',
        socialLinks: 'Social Media Links',
        statsSelection: 'Cards Selection',
      },
      labels: {
        githubUsername: 'GitHub Username',
        bioText: 'Profile Bio Text',
        includeTypingHeader: 'Animated Typing Header',
        includeStats: 'Profile Stats Card',
        includeStreak: 'Streak Stats Card',
        includeTopLangs: 'Top Languages Card',
        includeActivity: 'Activity Graph Card',
        includeTrophies: 'GitHub Trophies Card',
        includeSkills: 'SkillIcons Strip',
      },
      previewTab: 'Live Preview',
      codeTab: 'Markdown Code',
    },
  },
  de: {
    appTitle: 'Github Stats Generator',
    subtitle: 'Erstellen Sie dynamische, hochperformante Statistikkarten und Badges für Ihr GitHub-Profil.',
    usernamePlaceholder: 'GitHub-Benutzernamen eingeben...',
    themeLabel: 'Thema wählen',
    languageLabel: 'Sprache wählen',
    cardTitles: {
      profileStats: 'Profilstatistiken',
      topLangs: 'Top-Sprachen',
      streakStats: 'Streak-Statistiken',
      typingSvg: 'Animierte Header-Karte',
      repoStats: 'Pinned-Repository-Stats',
      activityGraph: 'Aktivitätsgraph',
      trophies: 'GitHub-Trophäen',
    },
    userLabel: 'Benutzer',
    activeCardsLabel: 'Aktive Karten',
    downloadSvg: 'SVG herunterladen',
    copyMarkdown: 'Markdown',
    copyHtml: 'HTML',
    copyUrl: 'URL',
    copied: 'Kopiert',
    footerDevBy: 'Dev by kroxly',
    navStats: 'Statistikkarten',
    navIcons: 'Badges & Icons Bibliothek',
    navReadme: 'README Generator',
    iconLibrary: {
      title: 'Badges & Icons Katalog',
      subtitle: 'Badges, 1:1 quadratische Icons und Vektor-Logos für Ihr GitHub-Profil.',
      formatLabel: 'Format:',
      styleLabel: 'Badge-Stil:',
      searchPlaceholder: 'Icon oder Tech suchen (z.B. Instagram, React, Python, LinkedIn)...',
      categories: {
        all: 'Alle',
        social: 'Soziale Medien',
        languages: 'Programmiersprachen',
        tech: 'Technologien & Frameworks',
        tools: 'Werkzeuge & Programme',
      },
      formats: {
        skillicons: 'SkillIcons (1:1)',
        full: 'Horizontales Badge',
        iconOnly: '1:1 Quadrat Schild',
        devicon: '1:1 Vektor Logo',
      },
      styles: {
        modernLarge: 'Modern Large',
        flatMinimal: 'Flat Minimal',
        square: 'Square',
        classic3d: 'Classic 3D',
      },
      stripTitle: 'SkillIcons.dev Multi-Icon-Streifen Generator',
      stripSubtitle: 'Klicken Sie auf Icons, um Ihren Skill-Streifen für Ihr README-Profil zu erstellen.',
      stripThemeDark: 'Dunkel',
      stripThemeLight: 'Hell',
      stripClear: 'Löschen',
      stripSelectedCount: 'Ausgewählte Icons:',
      addLinkBtn: 'Link hinzufügen',
      addToStripBtn: 'Zum SkillIcons-Streifen hinzufügen',
      addedToStripBtn: 'Zum SkillIcons-Streifen hinzugefügt',
      modalTitle: 'Profil-Link verbinden',
      usernameLabel: 'Ihr Benutzername:',
      usernamePlaceholder: 'benutzername',
      generatedLink: 'Generierter Link:',
      copyMarkdown: 'Markdown kopieren',
      copyHtml: 'HTML kopieren',
    },
    readmeGenerator: {
      title: 'README-Profilvorlagen-Generator',
      subtitle: 'Verwandeln Sie all Ihre Karten, Fähigkeiten und Details mit einem Klick in eine vollständige README.md-Vorlage.',
      copyTemplate: 'README.md kopieren',
      downloadFile: 'README.md herunterladen',
      sections: {
        personalInfo: 'Persönliche Infos & Einstellungen',
        aboutMe: 'Über mich Text',
        socialLinks: 'Social Media Links',
        statsSelection: 'Karten-Auswahl',
      },
      labels: {
        githubUsername: 'GitHub-Benutzername',
        bioText: 'Profil-Bio-Text',
        includeTypingHeader: 'Animierte Header-Karte',
        includeStats: 'Profilstatik-Karte',
        includeStreak: 'Streak-Statistik-Karte',
        includeTopLangs: 'Top-Sprachen-Karte',
        includeActivity: 'Aktivitätsgraph-Karte',
        includeTrophies: 'GitHub-Trophäen-Karte',
        includeSkills: 'SkillIcons Streifen',
      },
      previewTab: 'Live-Vorschau',
      codeTab: 'Markdown-Code',
    },
  },
  es: {
    appTitle: 'Github Stats Generator',
    subtitle: 'Genere tarjetas de estadísticas y distintivos dinámicos de alto rendimiento para su perfil de GitHub.',
    usernamePlaceholder: 'Ingrese su nombre de usuario de GitHub...',
    themeLabel: 'Seleccionar Tema',
    languageLabel: 'Seleccionar Idioma',
    cardTitles: {
      profileStats: 'Estadísticas del Perfil',
      topLangs: 'Lenguajes Principales',
      streakStats: 'Racha de Contribuciones',
      typingSvg: 'Tarjeta de Encabezado Animada',
      repoStats: 'Estadísticas del Repositorio',
      activityGraph: 'Gráfico de Actividad',
      trophies: 'Logros de GitHub',
    },
    userLabel: 'Usuario',
    activeCardsLabel: 'Tarjetas Activas',
    downloadSvg: 'Descargar SVG',
    copyMarkdown: 'Markdown',
    copyHtml: 'HTML',
    copyUrl: 'URL',
    copied: 'Copiado',
    footerDevBy: 'Dev by kroxly',
    navStats: 'Tarjetas de Estadísticas',
    navIcons: 'Biblioteca de Iconos y Insignias',
    navReadme: 'Generador README',
    iconLibrary: {
      title: 'Catálogo de Insignias e Iconos',
      subtitle: 'Insignias, iconos cuadrados 1:1 y logotipos vectoriales para su perfil de GitHub.',
      formatLabel: 'Formato:',
      styleLabel: 'Estilo de Insignia:',
      searchPlaceholder: 'Buscar icono o tecnología (ej. Instagram, React, Python, LinkedIn)...',
      categories: {
        all: 'Todos',
        social: 'Redes Sociales',
        languages: 'Lenguajes de Programación',
        tech: 'Tecnologías y Frameworks',
        tools: 'Herramientas y Programas',
      },
      formats: {
        skillicons: 'SkillIcons (1:1)',
        full: 'Insignia Horizontal',
        iconOnly: 'Escudo Cuadrado 1:1',
        devicon: 'Logo Vectorial 1:1',
      },
      styles: {
        modernLarge: 'Modern Large',
        flatMinimal: 'Flat Minimal',
        square: 'Square',
        classic3d: 'Classic 3D',
      },
      stripTitle: 'Generador de Tira Multi-Icono SkillIcons.dev',
      stripSubtitle: 'Haga clic en los iconos para crear su tira de habilidades para su perfil README.',
      stripThemeDark: 'Oscuro',
      stripThemeLight: 'Claro',
      stripClear: 'Limpiar',
      stripSelectedCount: 'Iconos Seleccionados:',
      addLinkBtn: 'Añadir Enlace',
      addToStripBtn: 'Añadir a la tira SkillIcons',
      addedToStripBtn: 'Añadido a la tira SkillIcons',
      modalTitle: 'Conectar Enlace de Perfil',
      usernameLabel: 'Su Nombre de Usuario:',
      usernamePlaceholder: 'nombre_usuario',
      generatedLink: 'Enlace Generado:',
      copyMarkdown: 'Copiar Markdown',
      copyHtml: 'Copiar HTML',
    },
    readmeGenerator: {
      title: 'Generador de Plantillas README',
      subtitle: 'Convierta todas sus tarjetas de estadísticas y detalles en una plantilla README.md completa con un solo clic.',
      copyTemplate: 'Copiar README.md',
      downloadFile: 'Descargar README.md',
      sections: {
        personalInfo: 'Información Personal y Ajustes',
        aboutMe: 'Texto Sobre Mí',
        socialLinks: 'Enlaces de Redes Sociales',
        statsSelection: 'Selección de Tarjetas',
      },
      labels: {
        githubUsername: 'Nombre de usuario de GitHub',
        bioText: 'Texto de Biografía del Perfil',
        includeTypingHeader: 'Encabezado Animado Typing',
        includeStats: 'Tarjeta de Estadísticas del Perfil',
        includeStreak: 'Tarjeta de Racha',
        includeTopLangs: 'Tarjeta de Lenguajes Principales',
        includeActivity: 'Tarjeta de Gráfico de Actividad',
        includeTrophies: 'Tarjeta de Logros de GitHub',
        includeSkills: 'Tira de SkillIcons',
      },
      previewTab: 'Vista Previa en Vivo',
      codeTab: 'Código Markdown',
    },
  },
  fr: {
    appTitle: 'Github Stats Generator',
    subtitle: 'Générez des cartes de statistiques et des badges dynamiques à haute performance pour votre profil GitHub.',
    usernamePlaceholder: 'Entrez le nom d’utilisateur GitHub...',
    themeLabel: 'Sélectionner le Thème',
    languageLabel: 'Sélectionner la Langue',
    cardTitles: {
      profileStats: 'Statistiques du Profil',
      topLangs: 'Langages Principaux',
      streakStats: 'Série de Contributions',
      typingSvg: 'Carte d’En-tête Animée',
      repoStats: 'Statistiques du Dépôt',
      activityGraph: 'Graphique d’Activité',
      trophies: 'Trophées GitHub',
    },
    userLabel: 'Utilisateur',
    activeCardsLabel: 'Cartes Actives',
    downloadSvg: 'Télécharger SVG',
    copyMarkdown: 'Markdown',
    copyHtml: 'HTML',
    copyUrl: 'URL',
    copied: 'Copié',
    footerDevBy: 'Dev by kroxly',
    navStats: 'Cartes de Stats',
    navIcons: 'Bibliothèque de Badges et Icônes',
    navReadme: 'Générateur README',
    iconLibrary: {
      title: 'Catalogue de Badges & Icônes',
      subtitle: 'Badges, icônes carrées 1:1 et logos vectoriels pour votre profil GitHub.',
      formatLabel: 'Format:',
      styleLabel: 'Style de Badge:',
      searchPlaceholder: 'Rechercher une icône (ex. Instagram, React, Python, LinkedIn)...',
      categories: {
        all: 'Tous',
        social: 'Réseaux Sociaux',
        languages: 'Langages de Programmation',
        tech: 'Technologies & Frameworks',
        tools: 'Outils & Programmes',
      },
      formats: {
        skillicons: 'SkillIcons (1:1)',
        full: 'Badge Horizontal',
        iconOnly: 'Bouclier Carré 1:1',
        devicon: 'Logo Vectoriel 1:1',
      },
      styles: {
        modernLarge: 'Modern Large',
        flatMinimal: 'Flat Minimal',
        square: 'Square',
        classic3d: 'Classic 3D',
      },
      stripTitle: 'Générateur de Bande Multi-Icônes SkillIcons.dev',
      stripSubtitle: 'Cliquez sur les icônes pour créer votre bande de compétences pour votre profil README.',
      stripThemeDark: 'Sombre',
      stripThemeLight: 'Clair',
      stripClear: 'Effacer',
      stripSelectedCount: 'Icônes Sélectionnées:',
      addLinkBtn: 'Ajouter un lien',
      addToStripBtn: 'Ajouter à la bande SkillIcons',
      addedToStripBtn: 'Ajouté à la bande SkillIcons',
      modalTitle: 'Connecter le lien de profil',
      usernameLabel: 'Votre nom d’utilisateur:',
      usernamePlaceholder: 'nom_utilisateur',
      generatedLink: 'Lien Généré:',
      copyMarkdown: 'Copier Markdown',
      copyHtml: 'Copier HTML',
    },
    readmeGenerator: {
      title: 'Générateur de Modèle README',
      subtitle: 'Transformez toutes vos cartes de statistiques et détails en un modèle README.md complet en un clic.',
      copyTemplate: 'Copier README.md',
      downloadFile: 'Télécharger README.md',
      sections: {
        personalInfo: 'Infos Personnelles & Réglages',
        aboutMe: 'Texte À propos de moi',
        socialLinks: 'Liens Réseaux Sociaux',
        statsSelection: 'Sélection des Cartes',
      },
      labels: {
        githubUsername: 'Nom d’utilisateur GitHub',
        bioText: 'Texte de Biographie',
        includeTypingHeader: 'En-tête Animé Typing',
        includeStats: 'Carte de Stats du Profil',
        includeStreak: 'Carte de Série de Contributions',
        includeTopLangs: 'Carte des Langages Principaux',
        includeActivity: 'Carte de Graphique d’Activité',
        includeTrophies: 'Carte de Trophées GitHub',
        includeSkills: 'Bande de SkillIcons',
      },
      previewTab: 'Aperçu en direct',
      codeTab: 'Code Markdown',
    },
  },
};
