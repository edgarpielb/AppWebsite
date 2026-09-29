// FAQ accordion: one open at a time.
document.querySelectorAll('.faq').forEach(function (faq) {
    faq.querySelectorAll('.faq-item').forEach(function (item) {
        var btn = item.querySelector('.faq-q');
        btn.addEventListener('click', function () {
            var open = item.classList.contains('open');
            faq.querySelectorAll('.faq-item.open').forEach(function (o) {
                o.classList.remove('open');
                o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
            });
            if (!open) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
            }
        });
    });
});
