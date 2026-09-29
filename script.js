// =====================================================
// VEYLO — COMPLETE FRONTEND SCRIPT
// =====================================================

const API_URL = "http://localhost:5000";

// =====================================================
// STATE
// =====================================================

let selectedFiles = [];


// =====================================================
// DOM ELEMENTS
// =====================================================

// Upload
const uploadBtn = document.getElementById("uploadBtn");
const emptyUploadBtn = document.getElementById("emptyUploadBtn");
const emptyUploadBtn2 = document.getElementById("emptyUploadBtn2");

const uploadModal = document.getElementById("uploadModal");
const closeModal = document.getElementById("closeModal");
const cancelUpload = document.getElementById("cancelUpload");

const chooseFiles = document.getElementById("chooseFiles");
const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const uploadList = document.getElementById("uploadList");
const startUpload = document.getElementById("startUpload");

// Auth
const loginBtn = document.getElementById("loginBtn");
const loginModal = document.getElementById("loginModal");
const closeLoginModal = document.getElementById("closeLoginModal");

const registerModal = document.getElementById("registerModal");
const closeRegisterModal =
    document.getElementById("closeRegisterModal");

const showRegisterBtn =
    document.getElementById("showRegisterBtn");

const showLoginBtn =
    document.getElementById("showLoginBtn");

const googleLoginBtn =
    document.getElementById("googleLoginBtn");

const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");

const loginMessage =
    document.getElementById("loginMessage");

const registerMessage =
    document.getElementById("registerMessage");

const logoutBtn =
    document.getElementById("logoutBtn");


// User profile
const userProfile =
    document.getElementById("userProfile");

const userName =
    document.getElementById("userName");

const userEmail =
    document.getElementById("userEmail");

const userAvatar =
    document.getElementById("userAvatar");


// Search
const searchInput =
    document.getElementById("searchInput");


// Files
const fileList =
    document.getElementById("fileList");

const fileCount =
    document.getElementById("fileCount");


// =====================================================
// TOKEN FUNCTIONS
// =====================================================

function getToken() {
    return localStorage.getItem("veylo_token");
}


function saveToken(token) {
    localStorage.setItem("veylo_token", token);
}


function removeToken() {
    localStorage.removeItem("veylo_token");
}


// =====================================================
// MODAL HELPERS
// =====================================================

function openModal(modal) {

    if (!modal) {
        return;
    }

    modal.classList.remove("hidden");

    document.body.classList.add("modal-open");
}


function closeModalElement(modal) {

    if (!modal) {
        return;
    }

    modal.classList.add("hidden");

    document.body.classList.remove("modal-open");
}


// =====================================================
// LOGIN MODAL
// =====================================================

function openLoginModal() {

    closeModalElement(registerModal);

    openModal(loginModal);

    clearMessages();
}


if (loginBtn) {

    loginBtn.addEventListener("click", () => {
        openLoginModal();
    });

}


if (closeLoginModal) {

    closeLoginModal.addEventListener("click", () => {

        closeModalElement(loginModal);

    });

}


// =====================================================
// REGISTER MODAL
// =====================================================

function openRegisterModal() {

    closeModalElement(loginModal);

    openModal(registerModal);

    clearMessages();
}


if (showRegisterBtn) {

    showRegisterBtn.addEventListener("click", () => {

        openRegisterModal();

    });

}


if (closeRegisterModal) {

    closeRegisterModal.addEventListener("click", () => {

        closeModalElement(registerModal);

    });

}


if (showLoginBtn) {

    showLoginBtn.addEventListener("click", () => {

        openLoginModal();

    });

}


// =====================================================
// CLOSE MODALS BY CLICKING OVERLAY
// =====================================================

document.querySelectorAll(".modal-overlay").forEach((overlay) => {

    overlay.addEventListener("click", () => {

        const modal = overlay.closest(".modal");

        if (modal) {
            closeModalElement(modal);
        }

    });

});


// =====================================================
// ESC KEY
// =====================================================

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") {
        return;
    }

    closeModalElement(loginModal);
    closeModalElement(registerModal);

    closeUploadModal();

});


// =====================================================
// LOGIN
// =====================================================

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        if (!email || !password) {
            showLoginMessage(
                "Please enter email and password.",
                "error"
            );

            return;
        }


        const submitButton =
            loginForm.querySelector("button[type='submit']");


        if (submitButton) {

            submitButton.disabled = true;
            submitButton.textContent = "Signing in...";
        }


        try {

            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Login failed."
                );
            }


            saveToken(data.token);


            showLoginMessage(
                "Login successful.",
                "success"
            );


            setTimeout(() => {

                closeModalElement(loginModal);

                loginForm.reset();

                updateAuthUI(data.user);

            }, 400);


        } catch (error) {

            console.error(
                "Login error:",
                error
            );


            showLoginMessage(
                error.message ||
                "Unable to login.",
                "error"
            );

        } finally {

            if (submitButton) {

                submitButton.disabled = false;
                submitButton.textContent = "Sign in";
            }
        }

    });

}


// =====================================================
// REGISTER
// =====================================================

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "registerName"
                ).value.trim();


            const email =
                document.getElementById(
                    "registerEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "registerPassword"
                ).value;


            if (!name || !email || !password) {

                showRegisterMessage(
                    "Please fill all fields.",
                    "error"
                );

                return;
            }


            if (password.length < 6) {

                showRegisterMessage(
                    "Password must be at least 6 characters.",
                    "error"
                );

                return;
            }


            const submitButton =
                registerForm.querySelector(
                    "button[type='submit']"
                );


            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Creating...";
            }


            try {

                const response = await fetch(
                    `${API_URL}/api/auth/register`,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            name,
                            email,
                            password
                        })
                    }
                );


                const data =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        data.message ||
                        "Registration failed."
                    );
                }


                saveToken(data.token);


                showRegisterMessage(
                    "Account created successfully.",
                    "success"
                );


                setTimeout(() => {

                    closeModalElement(
                        registerModal
                    );

                    registerForm.reset();

                    updateAuthUI(data.user);

                }, 500);


            } catch (error) {

                console.error(
                    "Registration error:",
                    error
                );


                showRegisterMessage(
                    error.message ||
                    "Unable to create account.",
                    "error"
                );

            } finally {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Create account";
                }
            }

        }
    );

}


// =====================================================
// GOOGLE LOGIN
// =====================================================

if (googleLoginBtn) {

    googleLoginBtn.addEventListener("click", () => {

        googleLoginBtn.disabled = true;

        googleLoginBtn.textContent =
            "Connecting to Google...";


        window.location.href =
            `${API_URL}/api/auth/google`;

    });

}


// =====================================================
// AUTH MESSAGES
// =====================================================

function showLoginMessage(message, type) {

    if (!loginMessage) {
        return;
    }

    loginMessage.textContent = message;

    loginMessage.className =
        `auth-message ${type}`;
}


function showRegisterMessage(message, type) {

    if (!registerMessage) {
        return;
    }

    registerMessage.textContent = message;

    registerMessage.className =
        `auth-message ${type}`;
}


function clearMessages() {

    if (loginMessage) {

        loginMessage.textContent = "";

        loginMessage.className =
            "auth-message";
    }


    if (registerMessage) {

        registerMessage.textContent = "";

        registerMessage.className =
            "auth-message";
    }

}


// =====================================================
// LOGOUT
// =====================================================

if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        removeToken();

        updateLoggedOutUI();

    });

}


// =====================================================
// UPDATE AUTH UI
// =====================================================

function updateAuthUI(user) {

    if (!user) {
        updateLoggedOutUI();
        return;
    }


    if (loginBtn) {
        loginBtn.classList.add("hidden");
    }


    if (userProfile) {
        userProfile.classList.remove("hidden");
    }


    if (userName) {

        userName.textContent =
            user.name || "User";
    }


    if (userEmail) {

        userEmail.textContent =
            user.email || "";
    }


    if (userAvatar) {

        if (user.avatar) {

            userAvatar.src =
                user.avatar;

            userAvatar.style.display =
                "block";

        } else {

            userAvatar.style.display =
                "none";
        }
    }

}


function updateLoggedOutUI() {

    if (loginBtn) {
        loginBtn.classList.remove("hidden");
    }


    if (userProfile) {
        userProfile.classList.add("hidden");
    }

}


// =====================================================
// LOAD CURRENT USER
// =====================================================

async function loadCurrentUser() {

    const token = getToken();


    if (!token) {

        updateLoggedOutUI();

        return null;
    }


    try {

        const response = await fetch(
            `${API_URL}/api/auth/me`,
            {
                method: "GET",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );


        const data =
            await response.json();


        if (response.status === 401) {

            console.log(
                "Saved token is expired/invalid. Removing it."
            );

            removeToken();

            updateLoggedOutUI();

            return null;
        }


        if (!response.ok) {

            throw new Error(
                data.message ||
                "Unable to load user."
            );
        }


        updateAuthUI(data.user);

        return data.user;


    } catch (error) {

        console.error(
            "Authentication error:",
            error
        );

        return null;
    }

}


// =====================================================
// GOOGLE CALLBACK
// =====================================================

function handleGoogleCallback() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const token =
        params.get("token");


    if (!token) {
        return false;
    }


    saveToken(token);


    // Remove token from browser URL
    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );


    return true;
}


// =====================================================
// UPLOAD MODAL
// =====================================================

function openUploadModal() {

    if (!getToken()) {

        openLoginModal();

        return;
    }


    openModal(uploadModal);
}


function closeUploadModal() {

    closeModalElement(uploadModal);

}


if (uploadBtn) {

    uploadBtn.addEventListener("click", () => {

        openUploadModal();

    });

}


if (emptyUploadBtn) {

    emptyUploadBtn.addEventListener("click", () => {

        openUploadModal();

    });

}


if (emptyUploadBtn2) {

    emptyUploadBtn2.addEventListener("click", () => {

        openUploadModal();

    });

}


// =====================================================
// UPLOAD MODAL CLOSE
// =====================================================

if (closeModal) {

    closeModal.addEventListener("click", () => {

        closeUploadModal();

    });

}


if (cancelUpload) {

    cancelUpload.addEventListener("click", () => {

        selectedFiles = [];

        renderUploadList();

        closeUploadModal();

    });

}


// =====================================================
// CHOOSE FILES
// =====================================================

if (chooseFiles) {

    chooseFiles.addEventListener("click", () => {

        if (fileInput) {
            fileInput.click();
        }

    });

}


if (fileInput) {

    fileInput.addEventListener(
        "change",
        (event) => {

            const files =
                Array.from(
                    event.target.files
                );


            addFiles(files);

        }
    );

}


// =====================================================
// DRAG & DROP
// =====================================================

if (dropZone) {

    dropZone.addEventListener(
        "dragover",
        (event) => {

            event.preventDefault();

            dropZone.classList.add(
                "dragging"
            );

        }
    );


    dropZone.addEventListener(
        "dragleave",
        () => {

            dropZone.classList.remove(
                "dragging"
            );

        }
    );


    dropZone.addEventListener(
        "drop",
        (event) => {

            event.preventDefault();

            dropZone.classList.remove(
                "dragging"
            );


            const files =
                Array.from(
                    event.dataTransfer.files
                );


            addFiles(files);

        }
    );

}


// =====================================================
// ADD FILES
// =====================================================

function addFiles(files) {

    if (!files.length) {
        return;
    }


    selectedFiles.push(...files);

    renderUploadList();

}


// =====================================================
// RENDER UPLOAD LIST
// =====================================================

function renderUploadList() {

    if (!uploadList) {
        return;
    }


    uploadList.innerHTML = "";


    selectedFiles.forEach(
        (file, index) => {

            const item =
                document.createElement("div");


            // Matches CSS in your stylesheet
            item.className =
                "upload-item";


            item.innerHTML = `

                <div class="upload-file-info">

                    <div class="upload-file-icon">
                        ${getFileIcon(file.type)}
                    </div>

                    <div class="upload-file-details">

                        <strong>
                            ${escapeHtml(file.name)}
                        </strong>

                        <span>
                            ${formatFileSize(file.size)}
                        </span>

                    </div>

                </div>

                <button
                    type="button"
                    class="remove-file"
                    data-index="${index}"
                    title="Remove"
                >
                    ×
                </button>
            `;


            uploadList.appendChild(item);

        }
    );


    uploadList
        .querySelectorAll(".remove-file")
        .forEach((button) => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    selectedFiles.splice(
                        index,
                        1
                    );


                    renderUploadList();

                }
            );

        });

}


// =====================================================
// FILE ICON
// =====================================================

function getFileIcon(type) {

    if (!type) {
        return "FILE";
    }


    if (type.startsWith("image/")) {
        return "IMG";
    }


    if (type.startsWith("video/")) {
        return "VID";
    }


    if (type.startsWith("audio/")) {
        return "AUD";
    }


    if (type.includes("pdf")) {
        return "PDF";
    }


    if (
        type.includes("zip") ||
        type.includes("compressed")
    ) {
        return "ZIP";
    }


    if (
        type.includes("word") ||
        type.includes("document")
    ) {
        return "DOC";
    }


    if (
        type.includes("excel") ||
        type.includes("spreadsheet")
    ) {
        return "XLS";
    }


    return "FILE";
}


// =====================================================
// START UPLOAD
// =====================================================

if (startUpload) {

    startUpload.addEventListener(
        "click",
        startFileUpload
    );

}


async function startFileUpload() {

    if (!selectedFiles.length) {

        alert(
            "Please select at least one file."
        );

        return;
    }


    const token = getToken();


    if (!token) {

        closeUploadModal();

        openLoginModal();

        return;
    }


    startUpload.disabled = true;

    startUpload.textContent =
        "Uploading...";


    try {

        for (
            let i = 0;
            i < selectedFiles.length;
            i++
        ) {

            const file =
                selectedFiles[i];


            const formData =
                new FormData();


            formData.append(
                "file",
                file
            );


            console.log(
                `Uploading ${i + 1}/${selectedFiles.length}: ${file.name}`
            );


            const response =
                await fetch(
                    `${API_URL}/api/upload`,
                    {
                        method: "POST",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        },

                        body: formData
                    }
                );


            let data = {};

            try {

                data =
                    await response.json();

            } catch {
                data = {};
            }


            if (response.status === 401) {

                removeToken();

                closeUploadModal();

                updateLoggedOutUI();

                alert(
                    "Your session has expired. Please login again."
                );

                openLoginModal();

                return;
            }


            if (!response.ok) {

                throw new Error(
                    data.message ||
                    "Upload failed."
                );
            }


            console.log(
                "Upload successful:",
                data
            );

        }


        alert(
            selectedFiles.length === 1
                ? "File uploaded successfully!"
                : "All files uploaded successfully!"
        );


        selectedFiles = [];


        renderUploadList();


        if (fileInput) {
            fileInput.value = "";
        }


        closeUploadModal();


        // Refresh file list if API exists
        loadFiles();


    } catch (error) {

        console.error(
            "Upload error:",
            error
        );


        alert(
            error.message ||
            "Something went wrong while uploading."
        );

    } finally {

        startUpload.disabled = false;

        startUpload.textContent =
            "Upload";
    }

}


// =====================================================
// FILE LIST
// =====================================================

async function loadFiles() {

    const token = getToken();


    if (!token) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/files`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );


        // Endpoint doesn't exist yet.
        // Don't show an error to the user.
        if (response.status === 404) {
            return;
        }


        if (!response.ok) {
            return;
        }


        const data =
            await response.json();


        if (data.files) {

            renderFiles(
                data.files
            );
        }


    } catch (error) {

        console.log(
            "File list not available yet:",
            error.message
        );

    }

}


// =====================================================
// RENDER FILES
// =====================================================

function renderFiles(files) {

    if (!fileList) {
        return;
    }


    if (!files || files.length === 0) {

        fileCount.textContent =
            "0 files";

        return;
    }


    fileCount.textContent =
        `${files.length} ${
            files.length === 1
                ? "file"
                : "files"
        }`;


    fileList.innerHTML = "";


    files.forEach((file) => {

        const row =
            document.createElement("div");


        row.className =
            "file-row";


        row.innerHTML = `

            <div>
                ${escapeHtml(
                    file.originalName ||
                    "Unnamed file"
                )}
            </div>

            <div>
                ${formatDate(
                    file.createdAt
                )}
            </div>

            <div>
                ${formatFileSize(
                    Number(file.size || 0)
                )}
            </div>

            <div></div>

        `;


        fileList.appendChild(row);

    });

}


// =====================================================
// SEARCH
// =====================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            const term =
                searchInput.value
                    .trim()
                    .toLowerCase();


            const rows =
                document.querySelectorAll(
                    ".file-row, .folder-card"
                );


            rows.forEach((row) => {

                const text =
                    row.textContent
                        .toLowerCase();


                row.style.display =
                    !term ||
                    text.includes(term)
                        ? ""
                        : "none";

            });

        }
    );

}


// =====================================================
// UTILITY FUNCTIONS
// =====================================================

function formatFileSize(bytes) {

    if (!bytes || bytes <= 0) {
        return "0 Bytes";
    }


    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB",
        "TB"
    ];


    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    return (
        parseFloat(
            (
                bytes /
                Math.pow(
                    1024,
                    index
                )
            ).toFixed(2)
        ) +
        " " +
        units[index]
    );

}


function formatDate(date) {

    if (!date) {
        return "-";
    }


    const d =
        new Date(date);


    if (Number.isNaN(d.getTime())) {
        return "-";
    }


    return d.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


function escapeHtml(value) {

    const div =
        document.createElement("div");


    div.textContent =
        String(value);


    return div.innerHTML;

}


// =====================================================
// NAVIGATION LINKS
// =====================================================

document
    .querySelectorAll(".nav-item")
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                event.preventDefault();


                document
                    .querySelectorAll(
                        ".nav-item"
                    )
                    .forEach((item) => {

                        item.classList.remove(
                            "active"
                        );

                    });


                link.classList.add(
                    "active"
                );

            }
        );

    });


// =====================================================
// QUICK CARD — UPLOAD FILES
// =====================================================

document
    .querySelectorAll(".quick-card")
    .forEach((card, index) => {

        // First quick card = Upload files
        if (index === 0) {

            card.addEventListener(
                "click",
                () => {

                    openUploadModal();

                }
            );


            card.style.cursor =
                "pointer";
        }

    });


// =====================================================
// GOOGLE CALLBACK + INITIAL LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        // Check if Google redirected back with JWT
        handleGoogleCallback();


        // Load current user
        await loadCurrentUser();

    }
);
