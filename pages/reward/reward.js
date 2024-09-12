function setActive(element) {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        const icons = link.querySelectorAll('i');
        icons[0].style.display = 'inline-block'; 
        icons[1].style.display = 'none';
    });

    const currentIcons = element.querySelectorAll('i');
    currentIcons[0].style.display = 'none';
    currentIcons[1].style.display = 'inline-block';
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("reward.js loaded successfully");

    // 已有的 setActive 函数逻辑
    function setActive(element) {
        const navLinks = document.querySelectorAll('nav a');

        navLinks.forEach(link => {
            const icons = link.querySelectorAll('i');
            icons[0].style.display = 'inline-block'; 
            icons[1].style.display = 'none';
        });

        const currentIcons = element.querySelectorAll('i');
        currentIcons[0].style.display = 'none';
        currentIcons[1].style.display = 'inline-block';
    }

    // 获取所有的奖励项
    const rewardItems = document.querySelectorAll('.reward-item');
    const startButton = document.getElementById('startButton');
    let spinning = false;
    let spinInterval;

    // 启动转盘
    startButton.addEventListener('click', function() {
        if (spinning) return; // 防止多次点击
        spinning = true;
        
        let currentIndex = 0;
        let spinCount = 0;
        const maxSpins = Math.floor(Math.random() * 10) + 20; // 随机转动次数

        // 定时器：模拟转动
        spinInterval = setInterval(() => {
            // 移除所有奖励项的高亮样式
            rewardItems.forEach(item => item.classList.remove('highlight'));

            // 高亮当前项
            rewardItems[currentIndex].classList.add('highlight');

            // 更新当前索引到下一个
            currentIndex = (currentIndex + 1) % rewardItems.length;

            // 如果达到最大转动次数，停止转盘
            spinCount++;
            if (spinCount >= maxSpins) {
                clearInterval(spinInterval);
                spinning = false; // 允许再次点击 "Start"
                console.log('Final Reward:', rewardItems[(currentIndex - 1 + rewardItems.length) % rewardItems.length].textContent);
            }
        }, 100); // 转动速度，数值越小转动越快
    });
});
