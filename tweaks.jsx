/* =================================================================
   TWEAKS ISLAND — portada direction · accent · grain · cursor · type
   Mounts in its own root, writes CSS vars / attributes to <html>/<body>.
================================================================= */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "portada": "centrada",
  "accent": "#F35695",
  "footer": "#264414",
  "displayFont": "Anton",
  "grain": true,
  "cursor": true
}/*EDITMODE-END*/;

const ACCENTS = {
  '#F35695': '#ffffff', // hot pink
  '#F98805': '#ffffff', // orange
  '#264414': '#FFF8EC', // olive
  '#D4C400': '#1A1410'  // acid lime-gold
};

// fondo del footer — colores que resaltan (texto claro encima)
const FOOTERS = {
  '#264414': '#FFF8EC', // olive
  '#F35695': '#FFF8EC', // hot pink
  '#1A1410': '#FFF8EC'  // ink
};

const DISPLAY_FONTS = {
  'Anton': "'Anton', sans-serif",
  'Archivo': "'Archivo', sans-serif",
  'Style Script': "'Style Script', cursive"
};

function applyTweaks(t){
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  if(hero) hero.setAttribute('data-portada', t.portada);
  root.style.setProperty('--accent', t.accent);
  root.style.setProperty('--accent-ink', ACCENTS[t.accent] || '#fff');
  root.style.setProperty('--foot-bg', t.footer);
  root.style.setProperty('--foot-fg', FOOTERS[t.footer] || '#FFF8EC');
  root.style.setProperty('--grain', t.grain ? '1' : '0');
  // display font: keep Archivo as fallback so condensed editorial impact stays
  const stack = DISPLAY_FONTS[t.displayFont] || DISPLAY_FONTS['Anton'];
  root.style.setProperty('--display', t.displayFont==='Anton' ? "'Anton','Archivo',sans-serif" : stack);
  document.body.setAttribute('data-cursor-on', (t.cursor && window.matchMedia('(pointer:fine)').matches) ? '1' : '0');
}

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(()=>{ applyTweaks(t); }, [t]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Portada" />
      <TweakRadio
        label="Disposición"
        value={t.portada}
        options={['centrada','dock','editorial']}
        onChange={(v)=>setTweak('portada', v)} />

      <TweakSection label="Color" />
      <TweakColor
        label="Acento"
        value={t.accent}
        options={Object.keys(ACCENTS)}
        onChange={(v)=>setTweak('accent', v)} />
      <TweakColor
        label="Fondo footer"
        value={t.footer}
        options={Object.keys(FOOTERS)}
        onChange={(v)=>setTweak('footer', v)} />

      <TweakSection label="Tipografía display" />
      <TweakSelect
        label="Títulos"
        value={t.displayFont}
        options={['Anton','Archivo','Style Script']}
        onChange={(v)=>setTweak('displayFont', v)} />

      <TweakSection label="Detalles 2000s" />
      <TweakToggle label="Grano de film" value={t.grain} onChange={(v)=>setTweak('grain', v)} />
      <TweakToggle label="Cursor creativo" value={t.cursor} onChange={(v)=>setTweak('cursor', v)} />
    </TweaksPanel>
  );
}

// mount in isolated root
const __twkRoot = document.createElement('div');
document.body.appendChild(__twkRoot);
ReactDOM.createRoot(__twkRoot).render(<App />);
