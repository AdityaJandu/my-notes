export function formatDate(date) {
    if (!date || isNaN(new Date(date))) return "";
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
