import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaCamera } from "react-icons/fa";

const courses = ["BTech", "MBA", "BSc", "BA", "MTech", "MSc", "Other"];
const skillsList = [
  "Programming", "UI/UX", "Public Speaking", "Leadership",
  "Data Analysis", "Design", "Writing", "Marketing",
  "Photography", "Other"
];
const interestsList = [
  "Sports", "Coding", "Music", "Gaming",
  "Travel", "Art", "AI", "Reading",
  "Photography", "Other"
];

const MultiSelectChips = ({ options, selected, setSelected }) => {
  const toggleOption = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter(s => s !== option));
    } else {
      setSelected([...selected, option]);
    }
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 12 }}>
      {options.map((opt) => (
        <motion.button
          key={opt}
          onClick={() => toggleOption(opt)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            padding: "10px 24px",
            borderRadius: 48,
            border: selected.includes(opt) ? "3px solid #e31c1c" : "2.5px solid #bbb",
            backgroundColor: selected.includes(opt) ? "#e31c1c44" : "#fff",
            color: selected.includes(opt) ? "#e31c1c" : "#333",
            fontWeight: "700",
            fontSize: 16,
            cursor: "pointer",
            userSelect: "none",
            transition: "all 0.3s ease",
            boxShadow: selected.includes(opt) ? "0 6px 12px #e31c1c73" : "none",
            whiteSpace: "nowrap",
          }}
          aria-pressed={selected.includes(opt)}
          type="button"
        >
          {opt}
        </motion.button>
      ))}
    </div>
  );
};

const WelcomeScreen = ({ username = "User", onFinish }) => {
  const [step, setStep] = useState(0);

  // Profile Setup states
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState("");

  // Course + Skills + Interests
  const [course, setCourse] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 2));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const finish = () => {
    onFinish({
      profilePic,
      bio,
      course,
      specialization,
      skills,
      interests,
    });
  };

  const variants = {
    hidden: { opacity: 0, filter: "blur(24px)", y: 20 },
    visible: { opacity: 1, filter: "blur(0)", y: 0 },
  };

  return (
    <motion.div
      className="welcome-animated"
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        minHeight: "72vh",
        maxWidth: 650,
        margin: "auto",
        background: "#fff",
        borderRadius: 36,
        boxShadow: "0 12px 64px 8px #e31c1c22, 0 1.5px 4px #c3c3c344",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        textAlign: "center",
        padding: "2rem 3rem",
        userSelect: "none",
      }}
    >
      {step === 0 && (
        <>
          <motion.h1
            className="welcome-title"
            initial={{ scale: 0.7 }}
            animate={{ scale: 1.2 }}
            transition={{ duration: 1 }}
            style={{
              fontSize: 46,
              fontWeight: 900,
              marginBottom: 24,
              letterSpacing: 1.5,
              color: "#18181a",
              lineHeight: 1.08,
            }}
          >
            Hi {username},<br />
            Welcome to <span style={{ color: "#e31c1c" }}>UniKart!</span>
          </motion.h1>
          <p
            className="welcome-desc"
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 48,
              color: "#252527",
              opacity: 0.92,
              maxWidth: 460,
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.4,
            }}
          >
            Let’s set up your profile to personalize your experience.
          </p>
          <motion.button
            className="welcome-btn"
            whileHover={{ scale: 1.1, backgroundColor: "#bf1414" }}
            whileTap={{ scale: 0.95, backgroundColor: "#a51010" }}
            onClick={nextStep}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              border: "none",
              borderRadius: 42,
              padding: "16px 48px",
              fontWeight: 900,
              fontSize: 20,
              color: "#fff",
              background: "#e31c1c",
              cursor: "pointer",
              boxShadow: "0 6px 28px #e31c1c44",
              textTransform: "uppercase",
              letterSpacing: 2,
              minWidth: 180,
            }}
          >
            Get Started
          </motion.button>
        </>
      )}

      {step === 1 && (
        <>
          <h2
            className="profile-title"
            style={{
              marginBottom: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              fontSize: 28,
              fontWeight: 900,
              color: "#18181a",
            }}
          >
            <FaUser /> Set Up Your Profile
          </h2>

          <label
            htmlFor="pfp-upload"
            className="profile-pic-label"
            style={{
              cursor: "pointer",
              display: "inline-block",
              marginBottom: 16,
              userSelect: "none"
            }}
          >
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile Preview"
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  boxShadow: "0 10px 40px #e31c1c3c",
                  marginBottom: 12,
                  objectFit: "cover",
                  userSelect: "none"
                }}
              />
            ) : (
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: "50%",
                  background: "#f2f2f2",
                  color: "#c81313",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2.5px dashed #e31c1c66",
                  marginBottom: 12,
                  fontSize: 40,
                  userSelect: "none"
                }}
              >
                <FaCamera />
              </div>
            )}

            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#e31c1c",
                userSelect: "none"
              }}
            >
              Upload photo
            </span>
          </label>
          <input
            id="pfp-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />

          <p style={{ fontSize: 14, fontWeight: "600", color: "#e31c1c", marginBottom: 28 }}>
            Profile picture recommended!
          </p>

          <textarea
            className="bio-input"
            placeholder="Your bio or about you (can skip)"
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={5}
            style={{
              fontSize: 18,
              padding: "12px",
              width: "100%",
              borderRadius: 20,
              border: "2px solid #ccc",
              resize: "none",
              boxShadow: "inset 0 2px 8px #eee",
              marginBottom: 24,
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              userSelect: "text"
            }}
          />

          <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
            <button
              className="profile-continue-btn"
              onClick={nextStep}
              style={{
                borderRadius: 32,
                padding: "15px 40px",
                fontSize: 18,
                fontWeight: "bold",
                color: "white",
                backgroundColor: "#e31c1c",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: 2,
                userSelect: "none"
              }}
            >
              Continue
            </button>
            <button
              className="profile-skip-btn"
              onClick={nextStep}
              style={{
                borderRadius: 32,
                padding: "15px 40px",
                fontSize: 18,
                fontWeight: "bold",
                color: "#e31c1c",
                backgroundColor: "white",
                border: "3px solid #e31c1c",
                cursor: "pointer",
                textTransform: "uppercase",
                letterSpacing: 2,
                userSelect: "none"
              }}
            >
              Skip Bio
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h2
            className="course-title"
            style={{ marginBottom: 24, fontSize: 28, fontWeight: "900", color: "#18181a" }}
          >
            Let’s complete your profile!
          </h2>

          <div style={{ textAlign: "left", marginBottom: 20 }}>
            <label style={{ fontWeight: "600", color: "#e31c1c", fontSize: 18, userSelect: "none" }}>
              Your Course <span style={{ color: "#cc0000" }}>*</span>
            </label>
            <select
              value={course}
              onChange={e => setCourse(e.target.value)}
              required
              style={{
                width: "100%",
                fontSize: 18,
                padding: 14,
                borderRadius: 14,
                border: "2px solid #e31c1c",
                marginTop: 6,
                boxSizing: "border-box",
                cursor: "pointer",
                userSelect: "none"
              }}
            >
              <option value="" disabled>Select your course</option>
              {courses.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div style={{ textAlign: "left", marginBottom: 20 }}>
            <label style={{ fontWeight: "600", color: "#e31c1c", fontSize: 18, userSelect: "none" }}>
              Specialization (if any)
            </label>
            <input
              type="text"
              value={specialization}
              onChange={e => setSpecialization(e.target.value)}
              placeholder="E.g. Computer Science, Finance, Design"
              style={{
                width: "100%",
                fontSize: 18,
                padding: 14,
                borderRadius: 14,
                border: "2px solid #e31c1c",
                boxSizing: "border-box",
                cursor: "text",
                userSelect: "text"
              }}
            />
          </div>

          <label
            style={{
              fontWeight: "600",
              fontSize: 18,
              color: "#e31c1c",
              textAlign: "left",
              width: "100%",
              userSelect: "none",
              marginBottom: 10,
            }}
          >
            Skills (select multiple)
          </label>
          <MultiSelectChips options={skillsList} selected={skills} setSelected={setSkills} />

          <label
            style={{
              fontWeight: "600",
              fontSize: 18,
              color: "#e31c1c",
              textAlign: "left",
              width: "100%",
              marginTop: 28,
              marginBottom: 10,
              userSelect: "none",
            }}
          >
            Interests (select multiple)
          </label>
          <MultiSelectChips options={interestsList} selected={interests} setSelected={setInterests} />

          <button
            onClick={finish}
            disabled={!course}
            style={{
              marginTop: 42,
              width: "100%",
              backgroundColor: course ? "#e31c1c" : "#ddd",
              border: "none",
              padding: "16px",
              borderRadius: 48,
              fontWeight: "900",
              fontSize: 20,
              color: course ? "white" : "#aaa",
              cursor: course ? "pointer" : "not-allowed",
              textTransform: "uppercase",
              letterSpacing: 3,
              userSelect: "none"
            }}
          >
            Finish Setup
          </button>
          {step > 0 && (
            <button
              onClick={prevStep}
              style={{
                marginTop: 16,
                backgroundColor: "transparent",
                border: "none",
                color: "#e31c1c",
                fontSize: 14,
                cursor: "pointer",
                textDecoration: "underline",
                userSelect: "none"
              }}
            >
              Back
            </button>
          )}
        </>
      )}
    </motion.div>
  );
};

export default WelcomeScreen;
