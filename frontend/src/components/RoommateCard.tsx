import Link from "next/link";

export default function RoommateCard({ user }: any) {
  console.log("Roommate user:", user);

  // const matchPercent = Number(user.matchPercent) || 0;

  // const matchColor =
  //   user.matchLevel === "Highly compatible" ? "#388E3C" :
  //   user.matchLevel === "Good match" ? "#9A7120" : "#C4714A";

  // const matchBg =
  //   user.matchLevel === "Highly compatible" ? "rgba(76,175,80,0.1)" :
  //   user.matchLevel === "Good match" ? "rgba(212,168,83,0.15)" : "rgba(196,113,74,0.1)";

  // const matchLabel =
  //   user.matchLevel === "Highly compatible" ? "Rất phù hợp" :
  //   user.matchLevel === "Good match" ? "Khá phù hợp" : "Ít phù hợp";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@300;400;500&display=swap');

        .roommate-card {
          background: white;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 12px rgba(28,26,24,0.07);
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
          text-decoration: none;
          display: block;
        }

        .roommate-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(28,26,24,0.13);
        }

        .roommate-avatar {
          width: 100%;
          aspect-ratio: 4/3;
          background: #E8DFD0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .roommate-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .roommate-avatar-initials {
          font-family: 'Playfair Display', serif;
          font-size: 40px;
          font-weight: 700;
          color: #D4A853;
          opacity: 0.8;
        }

        .match-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          padding: 4px 10px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          backdrop-filter: blur(8px);
          background: rgba(255,255,255,0.9);
          color: #1C1A18;
          box-shadow: 0 2px 8px rgba(28,26,24,0.15);
        }

        .roommate-info {
          padding: 16px;
        }

        .roommate-name {
          font-family: 'Playfair Display', serif;
          font-size: 17px;
          font-weight: 700;
          color: #1C1A18;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 6px;
        }

        .roommate-meta {
          font-size: 12px;
          color: #6B6560;
          margin-bottom: 10px;
        }

        .match-bar-wrap {
          height: 4px;
          background: #F0EBE3;
          border-radius: 4px;
          margin-bottom: 8px;
          overflow: hidden;
        }

        .match-bar {
          height: 100%;
          border-radius: 4px;
          transition: width 0.4s ease;
        }

        .match-level-tag {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 50px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.03em;
        }
      `}</style>

      <Link href={`/users/${user.id}`} className="roommate-card">
        {/* Avatar */}
        <div className="roommate-avatar"> 
          {user.avatar ? (
            <img src={user.avatar} alt={user.fullname} />
          ) : (
            <span className="roommate-avatar-initials">
              {user.fullName?.charAt(0)?.toUpperCase() || "?"}
            </span>
          )}

          {/* Match Badge */}
          {/* <span className="match-badge">{matchPercent}% phù hợp</span> */}
        </div>

        {/* Info */}
        <div className="roommate-info">
          <div className="roommate-name">{user.fullName || "Người dùng"}</div>

          <div className="roommate-meta">
            {[user.age ? `${user.age} tuổi` : null,
              user.gender?.toLowerCase() === "male"
                ? "Nam"
                : user.gender?.toLowerCase() === "female"
                  ? "Nữ"
                  : user.gender]
              .filter(Boolean).join(" · ") || "Chưa cập nhật"}
          </div>

          {/* Match bar */}
          {/* <div className="match-bar-wrap">
            <div
              className="match-bar"
              style={{ width: `${matchPercent}%`, background: matchColor }}
            />
          </div> */}

          {/* Match Level */}
          {/* <span className="match-level-tag" style={{ background: matchBg, color: matchColor }}>
            {matchLabel}
          </span> */}
        </div>
      </Link>
    </>
  );
}