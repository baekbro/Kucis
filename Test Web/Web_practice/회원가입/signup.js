document.getElementById("joinForm").addEventListener("submit", function(event) {
    let id = document.getElementById("id").value;
    let pw = document.getElementById("pw").value;
    let pwConfirm = document.getElementById("pw-confirm").value;
    let name = document.getElementById("name").value;
    let birthYear = document.getElementById("birth-year").value;
    let birthMonth = document.getElementById("birth-month").value;
    let birthDay = document.getElementById("birth-day").value;
    let gender = document.getElementById("gender").value;

    if (!id || !pw || !pwConfirm || !name || !birthYear || !birthMonth || !birthDay || !gender) {
        alert("모든 입력란을 작성해 주세요.");
        event.preventDefault(); 
        return;
    }

    if (pw !== pwConfirm) {
        alert("비밀번호가 일치하지 않습니다.");
        event.preventDefault(); 
    }
});
