import React from "react";

const FAQPage = () => {
  const faqs = [
    {
      id: "faq1",
      question: "How can I register for an event?",
      answer:
        'You can register for an event by creating an account, selecting the desired event, and clicking "Register". A confirmation email will be sent to you.',
      show: true,
    },
    {
      id: "faq2",
      question: "Can I cancel my event registration?",
      answer:
        "Yes, you can cancel your registration up to 24 hours before the event through the registration management page in your account.",
    },
    {
      id: "faq3",
      question: "How can I receive my certificate?",
      answer:
        "The certificate will be issued automatically after you complete check-in and check-out at the event. You can download it from your profile page.",
    },
    {
      id: "faq4",
      question: "I forgot my password, how can I recover it?",
      answer:
        'Click on "Forgot Password" on the login page, enter your email, and follow the instructions in the email sent to you.',
    },
    {
      id: "faq5",
      question: "How can I become an event organizer?",
      answer:
        "Contact the administrator via email or the contact form to get instructions on upgrading your account to an event organizer.",
    },
  ];

  return (
    <div className="page-section" id="faqSection">
      <div className="container-fluid p-4">
        <h2 className="mb-4">
          <i className="bi bi-question-circle me-2"></i>Frequently Asked Questions
        </h2>

        <div className="row">
          {/* Left Column - FAQ Accordion */}
          <div className="col-lg-8">
            <div className="accordion" id="faqAccordion">
              {faqs.map((faq, index) => (
                <div className="accordion-item" key={faq.id}>
                  <h2 className="accordion-header">
                    <button
                      className={`accordion-button ${faq.show ? "" : "collapsed"
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
                    className={`accordion-collapse collapse ${faq.show ? "show" : ""
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
              <h5>Need more help?</h5>
              <p>If you can't find the answer, please contact us:</p>
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
                <i className="bi bi-chat-left-dots-fill me-2"></i>Send a Message
              </button>
              <button className="btn btn-outline-primary w-100">
                <i className="bi bi-headset me-2"></i>Call Hotline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
