document.addEventListener("DOMContentLoaded", function () {
    const searchbutton = document.getElementById("search");
    const usernameinput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyprogresscircle = document.querySelector(".easy-progress");
    const mediumprogresscircle = document.querySelector(".medium-progress");
    const hardprogresscircle = document.querySelector(".hard-progress");
    const easylabel = document.getElementById("easy-label");
    const mediumlabel = document.getElementById("medium-label");
    const hardlabel = document.getElementById("hard-label");
    const cardstatscontainer = document.querySelector(".state-card");

    function validateuser(username) {
        if (username.trim() === "") {
            alert("username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const ismatching = regex.test(username);
        if (!ismatching) {
            alert("invalid username");
        }
        return ismatching;
    }

    async function fetchuserdetail(username) {
        const url = "https://leetcode-stats-api.herokuapp.com/";
        try {
            searchbutton.textContent = "searching...";
            searchbutton.disabled = true;

            const response = await fetch(`${url}${username}`);
            if (!response.ok) {
                throw new Error("Unable to fetch user details");
            }

            const parsedData = await response.json();
            console.log("Fetched data:", parsedData);

            if (!parsedData || parsedData.status !== "success") {
                statsContainer.innerHTML = `<p>No valid data found</p>`;
                return;
            }

            displayUserData(parsedData);

            
        } catch (error) {
            if (statsContainer) {
                statsContainer.innerHTML = `<p>No data found</p>`;
            } else {
                console.error("Stats container is missing in the DOM.");
            }
            console.error(error.message);
        } finally {
            searchbutton.textContent = "search";
            searchbutton.disabled = false;
        }
    }

    function updateprogress(solved, total, label, circle) {
        if (!label || !circle) {
            console.error("Label or Circle is null:", { label, circle });
            return;
        }
        const progressdegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressdegree}%`);
        label.textContent = `${solved}/${total}`;
    }

    function displayUserData(data) {
        updateprogress(data.easySolved, data.totalEasy, easylabel, easyprogresscircle);
        updateprogress(data.mediumSolved, data.totalMedium, mediumlabel, mediumprogresscircle);
        updateprogress(data.hardSolved, data.totalHard, hardlabel, hardprogresscircle);

        const cardsData = [
            { label: "Total Problems Solved", value: data.totalSolved },
            { label: "Overall Acceptance Rate", value: data.acceptanceRate },
            { label: "Overall LeetCode Ranking", value: data.ranking }
        ];

        if (cardstatscontainer) {
            cardstatscontainer.innerHTML = cardsData
                .map(
                    (card) =>
                        `<div class="card"><h4>${card.label}</h4><p>${card.value}</p></div>`
                )
                .join("");
        } else {
            console.error("Card stats container is missing in the DOM.");
        }
    }

    searchbutton.addEventListener('click', function () {
        const username = usernameinput.value;
        console.log("logging username: ", username);
        if (validateuser(username)) {
            fetchuserdetail(username);
        }
    });
});
