import { useMemo, useState } from "react";
import { Search, Bell, CalendarDays } from "lucide-react";
import Input from "../common/Input";
import { useDebounce } from "../../hooks/useDebounce";
import "./Topbar.css";

export default function Topbar() {
  const [q, setQ] = useState("");
  const dq = useDebounce(q, 250);

  const dateText = useMemo(() => {
    const d = new Date();
    const weekday = d.toLocaleDateString(undefined, { weekday: "long" });
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return { weekday, date: `${dd}/${mm}/${yyyy}` };
  }, []);

  return (
    <header className="topbar">
      {/* BRAND */}
      <div className="topbar-brand">To-Do</div>

      {/* SEARCH */}
      <div className="topbar-search">
        <Input
          placeholder="Search your task here..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          leftIcon={<Search size={18} />}
        />
        <span style={{ display: "none" }}>{dq}</span>
      </div>

      {/* RIGHT */}
      <div className="topbar-right">
        <button className="topbar-icon-btn">
          <Bell size={18} />
        </button>

        <button className="topbar-icon-btn">
          <CalendarDays size={18} />
        </button>

        <div className="date-box">
          <div className="weekday">{dateText.weekday}</div>
          <div className="date">{dateText.date}</div>
        </div>
      </div>
    </header>
  );
}
