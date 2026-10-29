// Dad's Yashica. The little camera doodle in the footer (click or tap, any
// device), or typing "yashica" anywhere: flash, and a polaroid of a dog
// selfie develops (scripts/polaroid.ts). Motion off → no flash, no develop.
import { register } from './registry';
import { onWord } from './keys';
import { takePicture } from '../polaroid';

register({
  id: 'yashica',
  init(ctx) {
    const shoot = () => {
      takePicture();
      ctx.found('yashica');
    };
    onWord('yashica', shoot);
    document.querySelectorAll<HTMLElement>('[data-camera]').forEach((btn) => btn.addEventListener('click', shoot));
  },
});
