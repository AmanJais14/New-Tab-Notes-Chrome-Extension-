// Reference the textarea and download button
const noteArea = document.getElementById('noteArea');
const downloadBtn = document.getElementById('downloadBtn');

// Load saved note from chrome.storage
chrome.storage.sync.get(['note'], function(result) {
  noteArea.value = result.note || ''; // Load the note or set to empty if not found
});

// Save the note on every input
noteArea.addEventListener('input', function() {
  chrome.storage.sync.set({note: noteArea.value}, function() {
    console.log('Note saved');
  });
});

// Download the note as a text file
downloadBtn.addEventListener('click', function() {
  const noteContent = noteArea.value;
  const blob = new Blob([noteContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'notes.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
