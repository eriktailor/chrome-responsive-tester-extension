const RULES = [
  {
    id: 1,
    priority: 1,
    action: {
      type: "modifyHeaders",
      responseHeaders: [
        { header: "x-frame-options", operation: "remove" },
        { header: "frame-options", operation: "remove" },
        { header: "content-security-policy", operation: "remove" }
      ]
    },
    condition: {
      resourceTypes: ["sub_frame"]
    }
  }
];

function setupRules() {
  chrome.declarativeNetRequest.updateSessionRules({
    removeRuleIds: [1],
    addRules: RULES
  }, () => {
    if (chrome.runtime.lastError) {
      console.error("Rule update failed:", chrome.runtime.lastError);
    } else {
      console.log("Session rules registered successfully.");
    }
  });
}

chrome.runtime.onInstalled.addListener(setupRules);
chrome.runtime.onStartup.addListener(setupRules);

// Setup on service worker load
setupRules();
