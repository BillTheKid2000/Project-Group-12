const apiKey = 'YOUR_API_KEY';
const searchUrl = 'http://archive.org/wayback/available?url=';

// Get the input values from the textboxes
const inputTextbox1 = document.getElementById('urlInput1'); // Assuming you have an input element with the ID 'urlInput1'
const inputTextbox2 = document.getElementById('urlInput2'); // Assuming you have an input element with the ID 'urlInput2'

// Get the display boxes
const displayBox1 = document.getElementById('displayBox1'); // Assuming you have a div element with the ID 'displayBox1'
const displayBox2 = document.getElementById('displayBox2'); // Assuming you have a div element with the ID 'displayBox2'

// Function to handle the search and display for display box 1
function searchAndDisplaySnapshot1() {
  // Get the user input URL for display box 1
  const targetUrl1 = inputTextbox1.value;

  // Create the request URL for display box 1
  const requestUrl1 = `${searchUrl}${targetUrl1}`;

  // Make the AJAX request to the Wayback Machine API for display box 1
  $.ajax({
    url: requestUrl1,
    method: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': `LOW ${apiKey}`
    },
    success: function (response) {
      // Check if the response contains archived snapshots for display box 1
      if (response && response.archived_snapshots && response.archived_snapshots.closest) {
        const closest = response.archived_snapshots.closest;
        const snapshotUrl = closest.url;

        // Display the snapshot on display box 1
        const iframe = document.createElement('iframe');
        iframe.src = snapshotUrl;
        displayBox1.appendChild(iframe);
      } else {
        console.log('No archived snapshots found for display box 1.');
      }
    },
    error: function (error) {
      console.log('Error:', error);
    }
  });
}

// Function to handle the search and display for display box 2
function searchAndDisplaySnapshot2() {
  // Get the user input URL for display box 2
  const targetUrl2 = inputTextbox2.value;

  // Create the request URL for display box 2
  const requestUrl2 = `${searchUrl}${targetUrl2}`;

  // Make the AJAX request to the Wayback Machine API for display box 2
  $.ajax({
    url: requestUrl2,
    method: 'GET',
    dataType: 'json',
    headers: {
      'Authorization': `LOW ${apiKey}`
    },
    success: function (response) {
      // Check if the response contains archived snapshots for display box 2
      if (response && response.archived_snapshots && response.archived_snapshots.closest) {
        const closest = response.archived_snapshots.closest;
        const snapshotUrl = closest.url;

        // Display the snapshot on display box 2
        const iframe = document.createElement('iframe');
        iframe.src = snapshotUrl;
        displayBox2.appendChild(iframe);
      } else {
        console.log('No archived snapshots found for display box 2.');
      }
    },
    error: function (error) {
      console.log('Error:', error);
    }
  });
}

// Attach event listeners to trigger the search and display for each display box
const searchButton1 = document.getElementById('searchButton1'); // Assuming you have a button element with the ID 'searchButton1'
const searchButton2 = document.getElementById('searchButton2'); // Assuming you have a button element with the ID 'searchButton2'

searchButton1.addEventListener('click', searchAndDisplaySnapshot1);
searchButton2.addEventListener('click', searchAndDisplaySnapshot2);
