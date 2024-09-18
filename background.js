chrome.runtime.onInstalled.addListener(() => {
    console.log("Timer Extension Installed");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "timerEnded") {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'icon128.png', // Ensure this icon file exists
            title: 'Timer Finished!',
            message: 'Your focus or rest time has ended.',
            priority: 2
        });
    }
});