import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  {
    title: "AI & Automation",
    description:
      "From intelligent chatbots to workflow automation, we bring AI solutions that optimize operations and reduce costs.",
  },
  {
    title: "Product Development",
    description:
      "Scalable websites, web apps, and mobile apps tailored to your business's unique needs.",
  },
  {
    title: "Tech Consultancy",
    description:
      "Identify gaps in processes, align technology to bridge those gaps, and implement transformative solutions tailored for success.",
  },
  {
    title: "Sales Channel Development",
    description:
      "Set up or enhance e-commerce and WhatsApp sales channels to unlock new growth avenues.",
  },
  {
    title: "Machine Learning-Driven Data Analysis",
    description:
      "Harness cutting-edge machine learning to decode data, predict trends, and empower precise, forward-thinking business strategies.",
  },
];

const CardDesign = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  flexDirection: "column",
  gap: "2rem",
  height: "450px",
  perspective: "1000px",
});

const CardWrapper = styled(Box)({
  width: "700px",
  height: "450px",
  position: "relative",
  cursor: "pointer",
  perspective: "1000px",
});

const CardInner = styled(Box)(({ rotation }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "24px",
  border: "1px solid rgba(139, 92, 246, 0.2)",
  transition: "transform 0.1s ease",
  transform: `rotateX(${rotation?.x || 0}deg) rotateY(${rotation?.y || 0}deg)`,
  boxShadow: "0 0px 40px rgba(139, 92, 246, 0.2)",
  background:
    "linear-gradient(to right, rgba(147, 51, 234, 0.2), rgba(139, 92, 246, 0.2))",
  transformStyle: "preserve-3d",
  position: "relative",
}));

const ContentWrapper = styled(Box)({
  height: "100%",
  padding: "32px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  color: "#fff",
  transform: "translateZ(60px)",
});

const BottomLine = styled(Box)({
  position: "absolute",
  bottom: "-30px",
  left: "50%",
  width: "95%",
  height: "2px",
  backgroundColor: "rgba(146, 51, 234, 0.61)",
  transform: "translateX(-50%)",
  borderRadius: "2px",
});

const PaginationDots = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  marginTop: "3rem",
  position: "relative",
  zIndex: 2,
});

const Dot = styled(Box)(({ isactive }) => ({
  width: "10px",
  height: "10px",
  borderRadius: "50%",
  backgroundColor: isactive ? "#fff" : "#888",
  transition: "background-color 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.2)",
    transition: "transform 0.2s ease",
  },
}));

const Card3D = ({ title, description, isVisible, cardRef }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const innerRef = useRef(null);

  useEffect(() => {
    const card = innerRef.current;

    const handleMouseMove = (e) => {
      if (!isVisible || !card) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = ((e.clientX - centerX) / rect.width) * 20;
      const rotateX = ((centerY - e.clientY) / rect.height) * 20;

      setRotation({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
      setRotation({ x: 0, y: 0 });
    };

    if (card) {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (card) {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isVisible]);

  return (
    <CardWrapper
      ref={cardRef}
      style={{
        display: isVisible ? "block" : "none",
        opacity: isVisible ? 1 : 0,
      }}
    >
      <CardInner ref={innerRef} rotation={rotation}>
        <ContentWrapper>
          <Typography
            variant="h4"
            sx={{
              color: "rgb(168, 85, 247)",
              margin: "-20rem 0 1rem 0rem",
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#ddd", fontSize: "1rem", lineHeight: "1.5" }}
          >
            {description}
          </Typography>
        </ContentWrapper>
        <BottomLine />
      </CardInner>
    </CardWrapper>
  );
};

const HeroPageSection3 = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const sectionRef = useRef(null);
  const [cardRefs] = useState(() =>
    Array(cardData.length)
      .fill(null)
      .map(() => React.createRef())
  );

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial positions
      cardRefs.forEach((ref, index) => {
        if (ref.current) {
          gsap.set(ref.current, {
            x: index === 0 ? "0%" : "100%",
            opacity: index === 0 ? 1 : 0,
          });
        }
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const index = Math.round(self.progress * (cardData.length - 1));
          if (
            index !== currentCard &&
            cardRefs[index]?.current &&
            cardRefs[currentCard]?.current
          ) {
            // Animate current card out
            gsap.to(cardRefs[currentCard].current, {
              x: "-100%",
              opacity: 0,
              duration: 0.9,
              ease: "power2.in",
            });

            // Animate new card in
            gsap.fromTo(
              cardRefs[index].current,
              { x: "100%", opacity: 0 },
              { x: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
            );

            setCurrentCard(index);
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleDotClick = (index) => {
    if (
      index === currentCard ||
      !cardRefs[index]?.current ||
      !cardRefs[currentCard]?.current
    )
      return;

    gsap.to(cardRefs[currentCard].current, {
      x: "-100%",
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    });

    gsap.fromTo(
      cardRefs[index].current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
    );

    setCurrentCard(index);
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        backgroundColor: "#030712",
        textAlign: "center",
        position: "relative",
        minHeight: "105vh",
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          color: "#fff",
          margin: "3rem",
        }}
      >
        Our{" "}
        <Box
          component="span"
          sx={{
            background: "linear-gradient(180deg, #2579e3 0%, #8e54f7 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
          }}
        >
          Services
        </Box>
      </Typography>
      <CardDesign>
        {cardData.map((card, index) => (
          <Card3D
            key={index}
            title={card.title}
            description={card.description}
            isVisible={currentCard === index}
            cardRef={cardRefs[index]}
          />
        ))}
      </CardDesign>
      <PaginationDots>
        {cardData.map((_, index) => (
          <Dot
            key={index}
            isactive={index === currentCard ? 1 : 0}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </PaginationDots>
    </Box>
  );
};

export default HeroPageSection3;
