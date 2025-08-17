
const style = document.createElement('style');
style.textContent = `
  .music-permission-box {
    position: fixed;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #111;
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    border: 2px solid #555;
    font-size: 1rem;
    max-width: 90%;
    box-shadow: 0 0 10px #555;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    animation: fadeInUp 0.5s ease;
  }

  .music-permission-box button {
    margin: 8px 4px 0;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
  }

  .music-permission-allow {
    background-color: #4CAF50;
    color: white;
  }

  .music-permission-deny {
    background-color: #f44336;
    color: white;
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translate(-50%, 20px); }
    to { opacity: 1; transform: translate(-50%, 0); }
  }

  @media (max-width: 500px) {
    .music-permission-box {
      font-size: 0.9rem;
      padding: 12px 16px;
    }

    .music-permission-box button {
      font-size: 0.85rem;
      padding: 6px 12px;
    }
  }
`;
document.head.appendChild(style);

// === Tạo Hộp Thông Báo ===
const box = document.createElement('div');
box.className = 'music-permission-box';
box.innerHTML = `
  <div>Bạn có muốn cho phép vừa nghe nhạc vừa lướt trang web không?</div>
  <div style="display:flex;gap:10px;">
    <button class="music-permission-allow">Cho phép luôn</button>
    <button class="music-permission-deny">Không, hẹn lại lần sau</button>
  </div>
`;
document.body.appendChild(box);

// === Gắn chức năng nút ===
box.querySelector('.music-permission-allow').onclick = () => {
  // Gọi hàm phát nhạc tại đây
  console.log("Phát nhạc...");
  box.remove();
};

box.querySelector('.music-permission-deny').onclick = () => {
  box.remove();
};
