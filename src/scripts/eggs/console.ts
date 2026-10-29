// A note for whoever opens the console.
import { register } from './registry';

register({
  id: 'console',
  init(ctx) {
    const msg = ctx.t({
      en: 'hi, curious person :)\nyou opened the console, so you’re my kind of visitor.\ntry pressing "?" on the page.\n— inaiá',
      pt: 'oi, pessoa curiosa :)\nvocê abriu o console, então é meu tipo de visita.\ntenta apertar "?" na página.\n— inaiá',
    });
    console.log(`%c${msg}`, 'font-family: "IBM Plex Mono", monospace; font-size: 12px; line-height: 1.6; padding: 8px 12px; background: #f3cf1c; color: #1c1a17;');
  },
});
