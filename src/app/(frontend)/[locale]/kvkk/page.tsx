import Image from 'next/image'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { setRequestLocale, getTranslations } from 'next-intl/server'
import { PageLayoutServer as PageLayout } from '@/components/layout'
import { getKVKKSections } from '@/lib/payload'
import { ContentSections } from '@/components/homepage/content-sections'
import type { KvkkSection as KVKKSectionType } from '@/payload-types'

export const metadata: Metadata = {
  title: 'KVKK | GEZAIRI',
  description:
    'Kişisel Verilerin Korunması Kanunu (KVKK) - Gezairi kişisel veri koruma politikası',
}

interface FallbackSection {
  number: string
  title: string
  content: React.ReactNode
}

const fallbackKVKKSections: FallbackSection[] = [
  {
    number: '1',
    title: 'VERİ SORUMLUSU',
    content: (
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, kişisel
        verileriniz; veri sorumlusu olarak GEZAIRI tarafından aşağıda açıklanan kapsamda
        işlenebilecektir. Bu aydınlatma metni, KVKK&apos;nın 10. maddesi ile Aydınlatma
        Yükümlülüğünün Yerine Getirilmesinde Uyulacak Usul ve Esaslar Hakkında Tebliğ
        kapsamında hazırlanmıştır.
      </p>
    ),
  },
  {
    number: '2',
    title: 'KİŞİSEL VERİLERİN İŞLENME AMACI',
    content: (
      <>
        <p className="mb-4">Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
        <ul className="list-disc ml-9">
          <li>Lojistik ve taşımacılık hizmetlerinin yürütülmesi</li>
          <li>Müşteri ilişkileri yönetimi ve iletişim faaliyetleri</li>
          <li>Sözleşmesel yükümlülüklerin yerine getirilmesi</li>
          <li>Yasal düzenlemelere uyum sağlanması</li>
          <li>İnsan kaynakları süreçlerinin yönetimi</li>
          <li>Bilgi güvenliği süreçlerinin yürütülmesi</li>
        </ul>
      </>
    ),
  },
  {
    number: '3',
    title: 'İŞLENEN KİŞİSEL VERİ KATEGORİLERİ',
    content: (
      <>
        <p className="mb-4">Aşağıdaki kategorilerdeki kişisel verileriniz işlenmektedir:</p>
        <ul className="list-disc ml-9">
          <li>
            <span className="font-semibold">Kimlik Bilgileri:</span> Ad, soyad, T.C. kimlik
            numarası, doğum tarihi
          </li>
          <li>
            <span className="font-semibold">İletişim Bilgileri:</span> Telefon numarası, e-posta
            adresi, adres
          </li>
          <li>
            <span className="font-semibold">Finansal Bilgiler:</span> Banka hesap bilgileri, fatura
            bilgileri
          </li>
          <li>
            <span className="font-semibold">Mesleki Bilgiler:</span> Şirket adı, unvan, görev
            tanımı
          </li>
        </ul>
      </>
    ),
  },
  {
    number: '4',
    title: 'KİŞİSEL VERİLERİN AKTARILMASI',
    content: (
      <>
        <p className="mb-4">
          Kişisel verileriniz, KVKK&apos;nın 8. ve 9. maddelerinde belirtilen şartlara uygun
          olarak aşağıdaki taraflara aktarılabilmektedir:
        </p>
        <ul className="list-disc ml-9">
          <li>İş ortaklarımız ve tedarikçilerimiz</li>
          <li>Yasal yükümlülükler kapsamında yetkili kamu kurum ve kuruluşları</li>
          <li>Hizmet aldığımız üçüncü taraf firmalar</li>
          <li>Yurt dışındaki iş ortaklarımız (gerekli güvenlik önlemleri alınarak)</li>
        </ul>
      </>
    ),
  },
  {
    number: '5',
    title: 'KİŞİSEL VERİ TOPLAMA YÖNTEMİ VE HUKUKİ SEBEBİ',
    content: (
      <>
        <p className="mb-4">
          Kişisel verileriniz; otomatik ve otomatik olmayan yöntemlerle, ofislerimiz, web sitemiz,
          e-posta, telefon ve diğer iletişim kanalları aracılığıyla toplanmaktadır.
        </p>
        <p className="mb-4">KVKK&apos;nın 5. maddesinde belirtilen hukuki sebeplere dayanılarak işlenmektedir:</p>
        <ul className="list-disc ml-9">
          <li>Kanunlarda açıkça öngörülmesi</li>
          <li>Sözleşmenin kurulması veya ifası için gerekli olması</li>
          <li>Hukuki yükümlülüğün yerine getirilmesi</li>
          <li>Meşru menfaatlerimiz için zorunlu olması</li>
          <li>Açık rızanızın bulunması</li>
        </ul>
      </>
    ),
  },
  {
    number: '6',
    title: 'KİŞİSEL VERİ SAHİBİNİN HAKLARI',
    content: (
      <>
        <p className="mb-4">KVKK&apos;nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz:</p>
        <ul className="list-disc ml-9 mb-4">
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme</li>
          <li>İşlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
          <li>Eksik veya yanlış işlenmiş olması halinde düzeltilmesini isteme</li>
          <li>KVKK&apos;nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini isteme</li>
          <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi
            suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme</li>
          <li>Kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız halinde zararın
            giderilmesini talep etme</li>
        </ul>
        <p>
          Haklarınızı kullanmak için{' '}
          <span className="font-semibold">gezairi@gezairi.com</span> adresine başvurabilirsiniz.
        </p>
      </>
    ),
  },
  {
    number: '7',
    title: 'VERİ GÜVENLİĞİ',
    content: (
      <p>
        GEZAIRI, kişisel verilerinizin hukuka aykırı olarak işlenmesini ve erişilmesini önlemek
        ile kişisel verilerinizin muhafazasını sağlamak amacıyla uygun güvenlik düzeyini temin
        etmeye yönelik gerekli her türlü teknik ve idari tedbirleri almaktadır.
      </p>
    ),
  },
  {
    number: '8',
    title: 'İLETİŞİM',
    content: (
      <p>
        KVKK kapsamındaki taleplerinizi aşağıdaki iletişim bilgileri aracılığıyla
        iletebilirsiniz:
        <br />
        <span className="font-semibold">E-posta:</span> gezairi@gezairi.com
        
        <br />
        <span className="font-semibold">Adres:</span> Boulos Fayyad Building 4th Floor Chafic
        Wazan Avenue, Beirut, Lebanon
      </p>
    ),
  },
]

function FallbackSectionComponent({ section }: { section: FallbackSection }) {
  return (
    <div className="flex flex-col gap-[20px] items-start px-4 md:px-[10px] w-full max-w-[1330px]">
      <div className="flex flex-col gap-[10px] items-start w-full">
        <h2 className="text-[20px] md:text-[24px] lg:text-[28px] font-bold text-gezairi-blue leading-[28px] md:leading-[32px] tracking-[0.55px] md:tracking-[0.78px] relative w-fit">
          {section.number}. {section.title}
        </h2>
      </div>
      <div className="text-[14px] md:text-[16px] lg:text-[20px] font-light text-gezairi-dark leading-[24px] md:leading-[28px] w-full [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6">
        {section.content}
      </div>
    </div>
  )
}

export default async function KVKKPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // KVKK is only available in Turkish
  if (locale !== 'tr') {
    redirect(`/tr/kvkk`)
  }

  setRequestLocale(locale)
  const t = await getTranslations('kvkk')
  const typedLocale = locale as import('payload').TypedLocale

  const kvkkResult = await getKVKKSections(typedLocale)

  const hasCmsData = kvkkResult.docs.length > 0
  const cmsSections = hasCmsData
    ? kvkkResult.docs
        .map((doc: KVKKSectionType) => ({
          number: String(doc.number),
          title: doc.title,
          content: doc.content,
        }))
        .sort((a, b) => Number(a.number) - Number(b.number))
    : []

  return (
    <PageLayout locale={typedLocale}>
      {/* Hero Section */}
      <section className="w-full px-[10px] md:px-5 pt-0">
        <div className="relative w-full max-w-[1348px] overflow-hidden rounded-[20px] bg-gezairi-blue aspect-[16/9] md:aspect-auto md:h-[350px] lg:h-[486px]">
          <Image
            src="/images/gezairi/heroes/newcover.jpg"
            alt="KVKK"
            fill
            sizes="(max-width: 768px) 100vw, 1348px"
            className="object-contain md:object-cover"
            priority
          />
          {/* 80 Years Emblem */}
          <div className="absolute top-[10px] end-0 w-[126px] h-[72px] md:top-0 md:w-[230px] md:h-[132px] lg:w-[345px] lg:h-[198px]">
            <Image
              src="/images/gezairi/heroes/who-we-are-emblem.png"
              alt="80 Years of Excellence"
              fill
              className="object-contain"
            />
          </div>
          <h1 className="absolute start-[17px] top-[28px] md:start-[31px] lg:top-[47px] text-[32px] md:text-[42px] lg:text-[64px] font-bold text-white leading-[35px] md:leading-tight lg:leading-[84px] w-3/4 md:w-auto">
            {t('title')}
          </h1>
        </div>
      </section>

      {/* KVKK Sections */}
      {hasCmsData ? (
        <ContentSections sections={cmsSections} />
      ) : (
        <section className="w-full flex flex-col gap-[50px] items-center py-[10px]">
          {fallbackKVKKSections.map((section) => (
            <FallbackSectionComponent key={section.number} section={section} />
          ))}
        </section>
      )}
    </PageLayout>
  )
}
