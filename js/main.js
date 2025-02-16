document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.getElementById('closeModal');

    // Handle image button clicks
    document.querySelectorAll('.view-image-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const questionCard = btn.closest('.question-card');
            const questionNum = questionCard.dataset.question;
            const imgPath = `images/Question${questionNum}_lab03.png`;
            
            modalContent.innerHTML = `
                <div class="content-wrapper relative bg-white p-4 rounded-lg">
                    <button class="close-btn absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl">&times;</button>
                    <img src="${imgPath}" alt="Question ${questionNum}" class="w-full">
                </div>
            `;
            modal.classList.remove('hidden');
        });
    });

    // SQL queries stored directly in JavaScript
    const sqlQueries = {
        1: `-- Question 1: Lab 3
-- Original query (shows date without time)
SELECT c_sec_id, sec_num, c_sec_day, c_sec_time
FROM course_section;

-- Formatted time (HH12:MI AM format)
SELECT c_sec_id, sec_num, c_sec_day,
TO_CHAR(c_sec_time, 'HH:MI AM') AS formatted_time
FROM course_section;`,
        2: `-- Question 2: Lab 3
-- String manipulation using LTRIM and RTRIM
SELECT 
    LTRIM(course_no, 'MIS') AS trimmed_left,
    RTRIM(course_no, '101') AS trimmed_right
FROM course
WHERE course_name LIKE '%Intro%';`,
        3: `-- Question 3: Lab 3
SELECT REPLACE(REPLACE(course_name, 'Intro', 'Introduction'), 
    'Mgmt', 'Management') AS replaced_text
FROM course
WHERE course_name LIKE '%Intro%' 
   OR course_name LIKE '%Mgmt%';`,
        // Add queries 4-9 here in the same format
    };

    // Handle SQL button clicks - client-side only
    document.querySelectorAll('.view-sql-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const questionCard = btn.closest('.question-card');
            const questionNum = questionCard.dataset.question;
            
            const sqlCode = sqlQueries[questionNum] || 'SQL query not found for this question';
            
            modalContent.innerHTML = `
                <div class="content-wrapper relative bg-white p-4 rounded-lg">
                    <button class="close-btn absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl">&times;</button>
                    <h3 class="text-xl mb-4">SQL Query - Question ${questionNum}</h3>
                    <pre><code class="language-sql">${sqlCode}</code></pre>
                </div>
            `;
            hljs.highlightAll();
            modal.classList.remove('hidden');
        });
    });

    // Add event delegation for close buttons
    modalContent.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-btn')) {
            modal.classList.add('hidden');
        }
    });

    // Close modal handlers
    closeModal.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.add('hidden');
    });

    // Keyboard escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') modal.classList.add('hidden');
    });
});
