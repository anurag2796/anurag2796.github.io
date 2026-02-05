console.log("The Force is strong with this one.");

// Optional: Add sound effect on hover (if we had audio files)
const buttons = document.querySelectorAll('.lightsaber-btn');
buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        // console.log("Hummmm");
    });
});
