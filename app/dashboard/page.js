import ViewsChart from "./components/viewsChart";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.stats}>
          <div className={styles.stat_box}>Total Posts: {0}</div>
          <div className={styles.stat_box}>Total Views: {0}</div>
          <div className={styles.stat_box}>Most Viewed Blog: {"blog_name"}</div>
        </div>

        <ViewsChart />
      </div>
    </>
  );
}
