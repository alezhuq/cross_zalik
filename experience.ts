export default function experience(date: Date) {
    const today = new Date();
    const diff = Math.abs(today.getTime() - date.getTime());
    const diff_days = diff / (1000 * 3600 * 24);

    return diff_days.toFixed();
}
