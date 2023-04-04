import ViewsChart from "./components/viewsChart";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  return (
    <>
      <div className={styles.stats}>
        <div className={styles.stat_box}>s</div>
        <div className={styles.stat_box}>s</div>
      </div>

      <ViewsChart />
    </>
  );
}
