import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    // Получаем FormData из запроса
    const formData = await request.formData();

    // Проверяем наличие всех необходимых полей
    const pasportPictureRegistration = formData.get('pasport_picture_registration');
    const pasportPictureMainPage = formData.get('pasport_picture_main_page');
    const personPicture = formData.get('person_picture');
    const phone = formData.get('phone');

    // Валидация данных
    if (!pasportPictureRegistration || !pasportPictureMainPage || !personPicture || !phone) {
      return NextResponse.json(
        {
          kyc_verified: false,
          status: 'error',
          message: 'Missing required fields'
        },
        { status: 400 }
      );
    }

    // Проверяем, что файлы действительно являются файлами
    if (!(pasportPictureRegistration instanceof File) ||
        !(pasportPictureMainPage instanceof File) ||
        !(personPicture instanceof File)) {
      return NextResponse.json(
        {
          kyc_verified: false,
          status: 'error',
          message: 'Invalid file format'
        },
        { status: 400 }
      );
    }

    // Здесь можно добавить логику обработки файлов (сохранение, валидация и т.д.)
    console.log('KYC submission received:', {
      pasportPictureRegistration: pasportPictureRegistration.name,
      pasportPictureMainPage: pasportPictureMainPage.name,
      personPicture: personPicture.name,
      phone: phone.toString(),
    });

    // Имитация успешной обработки KYC
    // В реальном приложении здесь была бы логика отправки на внешний сервис верификации
    return NextResponse.json({
      kyc_verified: true,
      status: 'success'
    });

  } catch (error) {
    console.error('KYC submission error:', error);
    return NextResponse.json(
      {
        kyc_verified: false,
        status: 'error',
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}