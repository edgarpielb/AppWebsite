// Every squishy on the page squishes: press flattens it and swaps to its squeezed face,
// letting go springs it back. Pointer for fingers and mice, Space or Enter for keys.
(function () {
    var cue = document.querySelector('.press-cue');

    document.querySelectorAll('.squishy').forEach(function (el) {
        var img = el.querySelector('img');
        var idle = img.getAttribute('src');
        var squeezed = el.getAttribute('data-squish');
        new Image().src = squeezed;
        var down = false;

        function press() {
            if (down) return;
            down = true;
            el.classList.remove('is-released');
            el.classList.add('is-pressed');
            img.src = squeezed;
            if (cue && el.classList.contains('hero-squishy')) cue.classList.add('is-done');
        }
        function release() {
            if (!down) return;
            down = false;
            el.classList.remove('is-pressed');
            void el.offsetWidth; // restart the wobble on a quick second press
            el.classList.add('is-released');
            img.src = idle;
        }

        el.addEventListener('pointerdown', function (e) {
            if (e.button !== 0) return;
            el.setPointerCapture(e.pointerId);
            press();
        });
        el.addEventListener('pointerup', release);
        el.addEventListener('pointercancel', release);
        el.addEventListener('lostpointercapture', release);
        el.addEventListener('animationend', function () { el.classList.remove('is-released'); });
        el.addEventListener('keydown', function (e) {
            if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); press(); }
        });
        el.addEventListener('keyup', function (e) {
            if (e.key === ' ' || e.key === 'Enter') release();
        });
        el.addEventListener('blur', release);
        el.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    });
})();
