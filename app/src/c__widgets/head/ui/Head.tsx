import { PROJECT_DATA } from "@/shared/config";

export const Head = () => (
  <head>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
    />
    <title>{PROJECT_DATA.meta.title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Montserrat:wght@100..900&family=Raleway:wght@100..900&family=Ubuntu:wght@300;400;500;700&display=swap"
      rel="stylesheet"
    />
    <link
      rel="icon"
      href="data:image/x-icon;base64,AAABAAEAAQEAAAEAIAAwAAAAFgAAACgAAAABAAAAAgAAAAEAIAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAAAAA=="
    ></link>
    <meta name="description" content={PROJECT_DATA.meta.description} />
    <script type="text/javascript" dangerouslySetInnerHTML={{
      __html: `   (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105924233', 'ym');

    ym(105924233, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});`}}>

    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/105924233" style={{position: 'absolute' , left: -9999}} alt="" /></div></noscript>
  </head>
);
