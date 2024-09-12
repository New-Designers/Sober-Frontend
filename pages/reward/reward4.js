<script>
    document.addEventListener('DOMContentLoaded', function() {
        // 选择所有带有 class 'date-badge' 的元素
        const dateBadges = document.querySelectorAll('.date-badge');

        // 为每个日期按钮添加点击事件
        dateBadges.forEach(badge => {
            badge.addEventListener('click', function() {
                alert('You clicked on ' + badge.textContent);
            });
        });
    });
</script>
