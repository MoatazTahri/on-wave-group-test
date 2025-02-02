const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
let uploadedFiles = []; // Store uploaded files in memory

// Prevent default browser behavior
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Highlight drop area on drag over
function highlight() {
    dropArea.classList.add('highlight');
}

// Remove highlight when drag leaves
function unhighlight() {
    dropArea.classList.remove('highlight');
}

// Handle files selection
function handleFiles(files) {
    for (const file of files) {
        if (file.type.startsWith('image/')) { // Only allow images
            uploadedFiles.push(file);
            uploadFile(file);
        }
    }
}

// Handle file drop
function handleDrop(e) {
    preventDefaults(e);
    unhighlight();
    const files = e.dataTransfer.files;
    handleFiles(files);
}

// Upload file to local resources/images folder
function uploadFile(file) {
    const formData = new FormData();
    formData.append('image', file);

    fetch('http://localhost:5000/upload-image', { // Ensure this matches your server
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => alert(data.message))
        .catch(error => console.error('Upload failed:', error));
}

// Open file input when clicking the drop area
dropArea.addEventListener('click', () => fileInput.click());

// Handle file input selection
fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

// Event listeners
['dragover', 'dragenter'].forEach(eventName => dropArea.addEventListener(eventName, highlight));
['dragleave', 'drop'].forEach(eventName => dropArea.addEventListener(eventName, unhighlight));
dropArea.addEventListener('drop', handleDrop);

dropArea.addEventListener('dragover', preventDefaults);
dropArea.addEventListener('dragenter', preventDefaults);
dropArea.addEventListener('dragleave', preventDefaults);