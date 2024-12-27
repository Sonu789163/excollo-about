import React, { useEffect } from "react";
import { Box, Typography, styled } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { motion } from 'framer-motion'; // Import motion for animations

// Remove keyframes since we'll use CSS transforms directly
// Styled components
const AboutSection = styled(motion.section)({
  maxWidth: "85%",
  margin: "auto",
  textAlign: "left",
  padding: "0 20px",
});

const SectionTitle = styled(motion.div)({
  fontSize: "3rem",
  marginBottom: "20px",
  "& .highlight": {
    fontSize: "80px",
    background: "linear-gradient(180deg, #2579E3 0%, #8E54F7 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
});

const Description = styled(motion.div)({
  fontSize: "1.2rem",
  color: "#ffffff",
});

// Framer Motion animation variants
const containerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5, // Delay between child animations
    },
  },
};

const titleVariant = {
  hidden: { opacity: 0, y: -50  }, // Title starts slightly above and hidden
  visible: { opacity: 1, y: 0, transition: { duration: 1.2 } },
};

const descriptionVariant = {
  hidden: { opacity: 0, y: 20, x:-50 }, // Description starts slightly below and hidden
  visible: { opacity: 1, y: 0, x: 0, transition: { duration: 1.8 } },
};

const ContentSection = styled("section")({
  display: "flex",
  width: "80%",
  margin: "auto",
  padding: "50px 20px",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    alignItems: "flex-start",
  },
});

const TitleContainer = styled("div")(({ align }) => ({
  flex: "0 0 488px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  opacity: 0,
  transform: align === "left" ? "translateX(-200px)" : "translateX(200px)",
  transition: "all 1.8s ease-in-out",
  "&.visible": {
    opacity: 1,
    transform: "translateX(0)",
  },
  "& h2": {
    textAlign: "left",
    fontSize: "80px",
    margin: 0,
    lineHeight: 1.2,
  },
  "@media (max-width: 768px)": {
    width: "100%",
  },
}));

const Card = styled("div")(({ direction = "90deg", align }) => ({
  width: "588px",
  height: "537px",
  background: `linear-gradient(${direction},#8E54F780, #332E6C, #0a0a17)`,
  borderRadius: "20px",
  padding: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  //   border: "1px solid #7e22ce",
  //   boxShadow: "0px 0px 100px 0px rgba(133, 86, 245, 0.4)",
  opacity: 0,
  transform: align === "left" ? "translateX(-100px)" : "translateX(100px)",
  transition: "all 1.8s ease-out",
  "&.visible": {
    opacity: 1,
    transform: "translateX(0)",
  },
  "& p": {
    fontSize: "1.5rem",
    color: "#D1D1E2",
    lineHeight: 1.7,
    textAlign: "left",
    padding: 20,
    margin: 20,
    opacity: 0,
    zIndex: 0,
    transform: "scale(0.5) translateY(0) translateX(0)",
    transition: "all 1.8s ease-out",
  },

  "&.visible p": {
    opacity: 1,
    zIndex: 1,
    transform: "scale(1) translateY(0)",
    transition: "all 1.8s ease-out",
  },
  "@media (max-width: 768px)": {
    width: "100%",
  },
}));

const WorkTable = styled("section")({
  width: "90%",
  margin: "60px auto",
  padding: "20px",
  opacity: 0,
  transform: "translateY(30px)",
  transition: "all 1.8s ease-out",
  "&.visible": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

const TableGrid = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  marginTop: "40px",
});

const TableContent = styled("div")({
  flex: "1 1 10%",
  border: "1px solid grey",
  padding: "30px",
  height: "400px",
  opacity: 0,
  transform: "scale(0.9) translateY(20px)",
  transition: "all 1.8s ease-out",
  "&.visible": {
    opacity: 1,
    transform: "scale(1) translateY(0)",
  },
  "& h3": {
    fontFamily: "Inter, sans-serif",
    fontSize: "32px",
    fontWeight: 600,
    marginBottom: "20px",
    color: "#fff",
  },
  "& p": {
    fontFamily: "Inter, sans-serif",
    fontSize: "16px",
    color: "#E6E7E8",
    lineHeight: 1.6,
  },
});

const AboutPageAnime = () => {
  useEffect(() => {
    // Create observer instance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Toggle visibility based on intersection
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            // Remove visible class when element is out of view
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        // Adjust threshold to control when animations trigger
        threshold: 0.5,
        rootMargin: "-60px",
      }
    );

    // Observe all elements with animate class
    const elements = document.querySelectorAll(".animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <Box sx={{ bgcolor: "#0A0A1E", color: "#fff", minHeight: "100vh", pb: 10 }}>
      {/* Repeat for other sections */}
      <AboutSection
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.5 }}
        variants={containerVariant}
      >
        <SectionTitle variants={titleVariant}>
          <span className="highlight">A</span>bout Us
        </SectionTitle>
        <Description variants={descriptionVariant}>
          Excollo is future-ready, offering unparalleled expertise to
          enterprises seeking to transform their digital stack. By leveraging
          cutting-edge AI, automation, and innovative consultancy, we identify
          opportunities, close gaps, and implement strategies that empower
          businesses to achieve scalable success.
        </Description>
      </AboutSection>

      <ContentSection>
        <TitleContainer align="left" className="animate">
          <h2>Our</h2>
          <h2>Vision</h2>
        </TitleContainer>
        <Card className="animate" align="right">
          <p>
            To empower businesses with future-ready technology that drives
            measurable results and lasting partnerships.
          </p>
        </Card>
      </ContentSection>

      <ContentSection>
        <Card direction="270deg" className="animate" align="left">
          <p>
            To bridge the gap between technology and business objectives by
            delivering cutting-edge solutions that guarantee outcomes.
          </p>
        </Card>
        <TitleContainer align="right" className="animate">
          <h2>Our</h2>
          <h2>Mission</h2>
        </TitleContainer>
      </ContentSection>

      <ContentSection>
        <TitleContainer align="left" className="animate">
          <h2>Our</h2>
          <h2>Philosophy</h2>
        </TitleContainer>
        <Card className="animate" align="right">
          <p>
            At Excollo, we commit to results, not just solutions. Our "Outcome
            as a Service" (OaaS) approach ensures every strategy, technology,
            and action is aligned to achieve measurable success for our clients.
          </p>
        </Card>
      </ContentSection>

      <WorkTable className="animate">
        <Typography
          variant="h2"
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "43.8px",
            fontWeight: 700,
            textAlign: "center",
            mb: 6,
          }}
        >
          How We Work?
        </Typography>
        <TableGrid>
          {[
            {
              title: "Discover",
              content:
                "Every end-to-end project starts with a discovery phase...",
            },
            {
              title: "Define",
              content:
                "Based on our discoveries, we define clear project scope...",
            },
            {
              title: "Design",
              content: "After we have a comprehensive understanding...",
            },
            {
              title: "Develop",
              content: "Our expert teams bring the design to life...",
            },
            {
              title: "Deliver",
              content: "We ensure smooth deployment and provide support...",
            },
          ].map((step, index) => (
            <TableContent
              key={index}
              className="animate"
              style={{
                transitionDelay: `${index * 0.15}s`,
                flex: "0 1 calc(15% - 10px)",
              }}
            >
              <h3>{step.title}</h3>
              <p>{step.content}</p>
            </TableContent>
          ))}
        </TableGrid>
      </WorkTable>
    </Box>
  );
};

export default AboutPageAnime;
