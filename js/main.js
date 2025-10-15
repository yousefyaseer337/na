document.addEventListener('DOMContentLoaded', () => {
    // 1. التعامل مع أزرار تسجيل الدخول/التسجيل (لإظهار نماذج Forms)
    const loginButton = document.querySelector('.btn.primary'); // زر تسجيل الدخول
    const registerButton = document.querySelector('.btn.secondary'); // زر سجل الآن

    loginButton.addEventListener('click', () => {
        alert('سيتم توجيهك إلى صفحة تسجيل الدخول...');
        // في مشروعك الحقيقي، هنا ستقوم بتوجيه المستخدم إلى صفحة 'login.html'
        // أو إظهار نافذة منبثقة (Modal) لنموذج تسجيل الدخول.
    });

    registerButton.addEventListener('click', () => {
        alert('سيتم فتح نموذج تسجيل متبرع جديد...');
        // هنا ستقوم بتوجيه المستخدم إلى صفحة 'register.html' أو فتح نموذج التسجيل.
    });


    // 2. وظيفة الحصول على موقع المستخدم الجغرافي
    const locationButton = document.querySelector('.btn.large.primary'); // زر 'أبحث عن بنك دم قريب'

    locationButton.addEventListener('click', () => {
        console.log("جارٍ محاولة الحصول على الموقع الجغرافي للمستخدم...");
        getLocationAndSearch();
    });

});


/**
 * دالة تستخدم Geolocation API للحصول على موقع المستخدم
 * وهي خطوة أساسية لتحديد أقرب بنك دم
 */
function getLocationAndSearch() {
    if (navigator.geolocation) {
        // نطلب الموقع من المتصفح
        navigator.geolocation.getCurrentPosition(
            showPosition, 
            handleLocationError,
            { timeout: 10000 } // خيارات: مهلة 10 ثوانٍ
        );
    } else {
        alert("متصفحك لا يدعم خاصية تحديد الموقع الجغرافي. الرجاء إدخال موقعك يدويًا.");
    }
}

/**
 * دالة تُنفذ عند نجاح الحصول على الموقع
 * @param {object} position - كائن الموقع الذي يحتوى على خط الطول وخط العرض
 */
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    // إظهار الموقع في الكونسول للتأكد
    console.log(`تم الحصول على الموقع: خط الطول ${lat}, خط العرض ${lon}`);
    
    alert('تم تحديد موقعك بنجاح! جاري البحث عن بنوك الدم القريبة...');
    
    // **** الخطوة التالية الحيوية: الاتصال بالـ Backend ****
    // هنا يجب أن تستدعي دالة ترسل (lat, lon) إلى خادم Django/Node.js 
    // ليقوم الخادم بحساب أقرب بنوك الدم بناءً على قاعدة البيانات.
    
    // مثال لاستدعاء دالة بحث (سنضيفها لاحقًا)
    // searchForNearbyBloodBanks(lat, lon);
}

/**
 * دالة تُنفذ عند فشل الحصول على الموقع (مثل رفض المستخدم)
 * @param {object} error - كائن الخطأ
 */
function handleLocationError(error) {
    let errorMessage;
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMessage = "لقد رفضت مشاركة موقعك. لا يمكن تحديد أقرب بنك دم.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMessage = "معلومات الموقع غير متاحة حاليًا.";
            break;
        case error.TIMEOUT:
            errorMessage = "انتهت مهلة طلب الموقع الجغرافي.";
            break;
        case error.UNKNOWN_ERROR:
            errorMessage = "حدث خطأ غير معروف أثناء تحديد الموقع.";
            break;
    }
    console.error("خطأ في تحديد الموقع:", errorMessage);
    alert(errorMessage + " يرجى محاولة البحث يدويًا.");
}

// يمكن إضافة المزيد من الدوال مثل (searchForBloodType) و (searchForNearbyBloodBanks)
// والتي تستخدم واجهة Fetch API للتواصل مع الخادم