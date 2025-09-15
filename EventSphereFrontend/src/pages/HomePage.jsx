// src/pages/HomePage.jsx
import StatisticCard from "../components/public/StatisticCard";
import EventCard from "../components/public/EventCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import CalendarComponent from "../components/public/Calendar";
import NotificationCard from "../components/public/NotificationCard";
import NewsCard from "../components/public/NewsCard";
import Footer from "../components/public/Footer";
import EventsList from "../components/public/EventsList";
import HomeHero from "../components/public/HomeHero";

// Import CSS Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function HomePage() {
  const featuredEvents = [
    {
      id: "ai-2024",
      title: "AI Technology Conference 2025",
      date: "12/09/2025 10:00 AM",
      description:
        "Conference on AI and Machine Learning for students passionate about Research.",
      imageUrl: "../assets/ai1.jpg",
    },
    {
      id: "tech-summit",
      title: "Global Technology Summit",
      date: "15/09/2025 01:00 PM",
      description:
        "Join to learn and exchange with leading technology experts in the field.",
      imageUrl:
        "https://aptechvietnam.com.vn/wp-content/uploads/1_0001_0_1.png",
    },
    {
      id: "coding-bootcamp",
      title: "Basic Programming Course",
      date: "20/09/2025 09:00 AM",
      description:
        "Learn programming from basic to advanced, mastering knowledge from A to Z.",
      imageUrl: "https://via.placeholder.com/300x200?text=Coding+Bootcamp",
    },
    {
      id: "design-thinking",
      title: "Design Thinking Workshop",
      date: "25/09/2025 02:00 PM",
      description:
        "Apply design thinking to solve creative problems in the field.",
      imageUrl: "https://via.placeholder.com/300x200?text=Design+Thinking",
    },
  ];

  const notifications = [
    {
      id: "notif1",
      title: "New notification",
      date: "10/09/2025",
      message: "AI Conference registration is now open.",
      link: "/notifications",
    },
    {
      id: "notif2",
      title: "System update",
      date: "09/09/2025",
      message: "System upgraded successfully.",
      link: "/notifications",
    },
  ];

  const news = [
    {
      id: "news1",
      title: "AI in Education",
      date: "08/09/2025",
      summary: "Discover how AI is transforming education.",
      imageUrl:
        "https://aptechvietnam.com.vn/wp-content/uploads/1_0001_0_1.png",
      link: "/news/ai",
    },
    {
      id: "news2",
      title: "Technology 2025",
      date: "07/09/2025",
      summary: "Latest technology trends.",
      imageUrl:
        "https://aptechvietnam.com.vn/wp-content/uploads/1_0001_0_1.png",
      link: "/news/tech",
    },
  ];

  return (
    <div>
      <HomeHero />

      <div className="container">
        {/* Statistics */}
        <div className="container mt-5 ">
          <h2 className="mb-4">Overview Statistics</h2>
          <div className="row">
            <div className="col-md-3">
              <StatisticCard
                icon="bi-calendar-event"
                number="156"
                title="Total Events"
                subtitle="+12 this month"
              />
            </div>
            <div className="col-md-3">
              <StatisticCard
                icon="bi-people"
                number="2,847"
                title="Participants"
                subtitle="+234 this week"
              />
            </div>
            <div className="col-md-3">
              <StatisticCard
                icon="bi-award"
                number="1,234"
                title="Certificates Issued"
                subtitle="+89 today"
              />
            </div>
            <div className="col-md-3">
              <StatisticCard
                icon="bi-star-fill"
                number="4.8"
                title="Average Rating"
                subtitle="From 892 reviews"
              />
            </div>
          </div>
        </div>

        {/* Featured Events */}
        <div className="container mt-5">
          <h2 className="mb-4">Featured Events</h2>
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
            }}
            className="mb-5"
          >
            {featuredEvents.map((event) => (
              <SwiperSlide key={event.id}>
                <div
                  className="h-100 d-flex"
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "450px", // 👈 Fixed height for all cards
                  }}
                >
                  <EventCard
                    eventId={event.id}
                    title={event.title}
                    date={event.date}
                    description={event.description}
                    imageUrl={event.imageUrl}
                    className="flex-fill d-flex flex-column"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Calendar & Notifications */}
        <div className="container mt-5">
          <h2 className="mb-4">Event Calendar & Notifications</h2>
          <div className="row">
            <div className="col-md-9">
              <CalendarComponent />
            </div>
            <div className="col-md-3">
              <h5 className="mb-3">Recent Notifications</h5>
              {notifications.map((notif) => (
                <NotificationCard
                  key={notif.id}
                  title={notif.title}
                  date={notif.date}
                  message={notif.message}
                  link={notif.link}
                />
              ))}
            </div>
          </div>
        </div>

        {/* News */}
        <div className="container mt-5">
          <h2 className="mb-4">News</h2>
          <div className="row">
            {news.map((item) => (
              <div key={item.id} className="col-md-6 mb-3">
                <NewsCard
                  title={item.title}
                  date={item.date}
                  summary={item.summary}
                  imageUrl={item.imageUrl}
                  link={item.link}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
