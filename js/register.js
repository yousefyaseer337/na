document.addEventListener('DOMContentLoaded', () => {
    const getLocationBtn = document.getElementById('get-location-btn');
    const locationStatus = document.getElementById('location-status');
    const latitudeInput = document.getElementById('latitude');
    const longitudeInput = document.getElementById('longitude');

    getLocationBtn.addEventListener('click', getLocation);

    function getLocation() {
        if (navigator.geolocation) {
            locationStatus.textContent = "جارٍ تحديد موقعك... قد يستغرق الأمر بعض الوقت.";
            navigator.geolocation.getCurrentPosition(
                showPosition, 
                handleLocationError,
                { timeout: 10000 }
            );
        } else {
            locationStatus.textContent = "متصفحك لا يدعم تحديد الموقع الجغرافي.";
        }
    }

    function showPosition(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        // تحديث حقول الإدخال المخفية
        latitudeInput.value = lat;
        longitudeInput.value = lon;
        
        locationStatus.textContent = ` ✅ تم تحديد الموقع بنجاح! خط الطول: ${lat.toFixed(4)}, خط العرض: ${lon.toFixed(4)}`;
        
        // هنا يمكنك إرسال البيانات إلى الخادم باستخدام Fetch API
        // عند الضغط على زر "إكمال التسجيل"
    }

    function handleLocationError(error) {
        locationStatus.textContent = "❌ فشل تحديد الموقع. تأكد من إعطاء إذن الوصول.";
        console.error("خطأ في تحديد الموقع:", error);
    }
});