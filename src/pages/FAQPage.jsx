import React from "react";

const FAQPage = () => {
  const faqs = [
    {
      id: "faq1",
      question: "Làm thế nào để đăng ký tham gia sự kiện?",
      answer:
        'Bạn có thể đăng ký tham gia sự kiện bằng cách tạo tài khoản, sau đó chọn sự kiện mong muốn và nhấn "Đăng ký tham gia". Hệ thống sẽ gửi email xác nhận đến bạn.',
      show: true,
    },
    {
      id: "faq2",
      question: "Tôi có thể hủy đăng ký sự kiện không?",
      answer:
        "Có, bạn có thể hủy đăng ký sự kiện trước 24 giờ diễn ra sự kiện thông qua trang quản lý đăng ký trong tài khoản của mình.",
    },
    {
      id: "faq3",
      question: "Làm thế nào để nhận chứng chỉ?",
      answer:
        "Chứng chỉ sẽ được cấp tự động sau khi bạn hoàn thành check-in và check-out sự kiện. Bạn có thể tải xuống chứng chỉ từ trang cá nhân.",
    },
    {
      id: "faq4",
      question: "Tôi quên mật khẩu, làm sao để khôi phục?",
      answer:
        'Nhấn vào "Quên mật khẩu" ở trang đăng nhập, nhập email của bạn và làm theo hướng dẫn trong email được gửi đến.',
    },
    {
      id: "faq5",
      question: "Làm thế nào để trở thành tổ chức sự kiện?",
      answer:
        "Liên hệ với quản trị viên qua email hoặc form liên hệ để được hướng dẫn nâng cấp tài khoản thành tổ chức sự kiện.",
    },
  ];

  return (
    <div className="page-section" id="faqSection">
      <div className="container-fluid p-4">
        <h2 className="mb-4">
          <i class="bi bi-question-circle me-2"></i>Câu hỏi thường gặp
        </h2>

        <div className="row">
          {/* Left Column - FAQ Accordion */}
          <div className="col-lg-8">
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div className="accordion-item" key={faq.id}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${
                        faq.show ? "" : "collapsed"
                      }`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#${faq.id}`}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={faq.id}
                    className={`accordion-collapse collapse ${
                      faq.show ? "show" : ""
                    }`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Support Card */}
          <div className="col-lg-4">
            <div className="dashboard-card p-3">
              <h5>Cần hỗ trợ thêm?</h5>
              <p>Nếu không tìm thấy câu trả lời, hãy liên hệ với chúng tôi:</p>
              <button
                className="btn btn-primary w-100 mb-2"
                onClick={() => {
                  const contactSection =
                    document.getElementById("contactSection");
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                <i class="bi bi-chat-left-dots-fill me-2"></i>Gửi tin nhắn
              </button>
              <button className="btn btn-outline-primary w-100">
                <i class="bi bi-headset me-2"></i>Gọi hotline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
