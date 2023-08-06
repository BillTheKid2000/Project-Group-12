const card1 = document.getElementById('card1');
const card2 = document.getElementById('card2');

let topCard = card1;
let bottomCard = card2;

function swapCards() {
  setTimeout(function() {
    let tempZIndex = getComputedStyle(topCard).zIndex;
    topCard.style.zIndex = getComputedStyle(bottomCard).zIndex;
    bottomCard.style.zIndex = tempZIndex;
  }, 400);

  if (getComputedStyle(topCard).transform === "matrix(1, 0, 0, 1, 0, 0)") {
    topCard.style.transform = "translateX(20px) translateY(20px)";
    bottomCard.style.transform = "translateX(0px) translateY(0px)";
  } else {
    topCard.style.transform = "translateX(0px) translateY(0px)";
    bottomCard.style.transform = "translateX(20px) translateY(20px)";
  }

  [topCard, bottomCard] = [bottomCard, topCard];
}

$(document).ready(function() {
  $("#btn-card1").click(function() {
    if (topCard !== card1) {
      swapCards();
    }
  });

  $("#btn-card2").click(function() {
    if (topCard !== card2) {
      swapCards();
    }
  });
});

const apiKey = 'YOUR_ACTUAL_API_KEY';
const searchUrl = 'https://archive.org/wayback/available?url=';
const inputTextbox = document.getElementById('urlInput');

function searchAndDisplayWebPages() {
  const targetUrl = inputTextbox.value;
  const currentWebPageRequestUrl = `${searchUrl}${targetUrl}`;
  const archivedWebPageRequestUrl = `${searchUrl}${targetUrl}&timestamp=${getTimestampTenYearsAgo()}`;

  $.ajax({
    url: currentWebPageRequestUrl,
    method: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': `LOW ${apiKey}`
    },
    success: function (response) {
      if (response && response.archived_snapshots && response.archived_snapshots.closest) {
        const closest = response.archived_snapshots.closest;
        let snapshotUrl = closest.url;
        snapshotUrl = snapshotUrl.replace(/^http:/, 'https:');  
    
        const iframe = document.createElement('iframe');
        iframe.src = snapshotUrl;
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = '0';
        topCard.innerHTML = '';
        topCard.appendChild(iframe);
      } else {
        topCard.innerHTML = 'No archived snapshots found for the current web page.';
      }
    },
    error: function (error) {
      console.log('Error:', error);
    }
  });

  $.ajax({
    url: archivedWebPageRequestUrl,
    method: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': `LOW ${apiKey}`
    },
    success: function (response) {
      if (response && response.archived_snapshots && response.archived_snapshots.closest) {
        const closest = response.archived_snapshots.closest;
        let snapshotUrl = closest.url;
        snapshotUrl = snapshotUrl.replace(/^http:/, 'https:');  
    
        const iframe = document.createElement('iframe');
        iframe.src = snapshotUrl;
        bottomCard.innerHTML = '';
        bottomCard.appendChild(iframe);
      } else {
        bottomCard.innerHTML = 'No archived snapshots found for the archived web page.';
      }
    },
    error: function (error) {
      console.log('Error:', error);
    }
  });
}

function getTimestampTenYearsAgo() {
  const currentDate = new Date();
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(currentDate.getFullYear() - 10);
  const year = tenYearsAgo.getFullYear();
  const month = String(tenYearsAgo.getMonth() + 1).padStart(2, '0');
  const day = String(tenYearsAgo.getDate()).padStart(2, '0');
  return `${year}${month}${day}`;
}

const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', searchAndDisplayWebPages);

// Attach an event listener to trigger the search and display when the 'Enter' key is pressed
inputTextbox.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchAndDisplayWebPages();
  }
});

