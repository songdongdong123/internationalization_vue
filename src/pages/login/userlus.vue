<template>
  <div class="userlus">
    <div class="titles">
      <div class="titlecontainer">
        <span @click="backUserCenter" class="left icon-fanhui1"></span>
        <!-- 使用条款 -->
        <p>{{$t('supplement.rlusMeta')}}</p>
      </div>
    </div>
    <div class="userrluscon">
      <scroll
        :listenScroll="listenScroll"
        class="userrluscontainer"
      >
        <div>
          <p class="title1">Términos y Condiciones de 1PESO.MX</p>
          <p class="containe1">1PESO.MX es una plataforma que ofrece a los usuarios boletos para participar en el sorteo de diversos productos.</p>
          <p class="containe2">Cuando se hace uso de la plataforma 1PESO.MX el usuario acepta este Acuerdo de Servicio y los Términos y Condiciones relacionados con la misma.</p>
          <p class="containe2">Se recomienda leer los Términos y Condiciones cuidadosamente antes de registrarse y utilizar el servicio. Si tiene alguna duda, favor de contactar a 1PESO.MX a través de <span class="email">soporte@1peso.com.mx</span> </p>
          <p class="containe2">Una vez que se haya registrado exitosamente, se considerará que ha aceptado los Términos y Condiciones como parte del Acuerdo de Servicio. Este acuerdo de servicio tendrá efecto legal entre el usuario y 1PESO.MX.</p>
          <p class="containe2">De acuerdo con el principio de servir a los clientes y respetar la ley, revisaremos los términos de este acuerdo periódicamente, reservándonos el derecho de modificar los términos de este acuerdo cuando sea necesario. Una vez que se haya modificado el contenido del acuerdo, 1PESO.MX dará aviso al usuario en la página principal del sitio web o en sección de destacados. Si continúa utilizando los servicios de 1PESO.MX, se considerará que acepta los cambios en el acuerdo. Si no acepta los cambios realizados al contenido del acuerdo, 1PESO.MX cancelará de inmediato el uso de los servicios relacionados.</p>
          <p class="title">I. Del registro de usuarios</p>
          <p class="containe3"><span class="number">1.</span>El registro se trata del proceso cuando el usuario llena los datos requeridos y revisa el acuerdo.</p>
          <p class="containe3"><span class="number">2.</span>Los usuarios de 1PESO.MX deben ser personas físicas, mayores de edad con plena capacidad civil u organizaciones con operaciones legales continuas. Las personas sin capacidad de conducta civil, personas con capacidad civil limitada u organizaciones sin negocios o calificaciones comerciales específicas no pueden registrarse como usuarios de 1PESO.MX. </p>
          <p class="title">II. De la cuenta, la contraseña y la seguridad</p>
          <p class="containe2">Una vez que el usuario se registra con éxito, se convierte en un usuario legítimo de 1PESO.MX, y el usuario será responsable de la seguridad del nombre de usuario y la contraseña. Además, cada usuario debe asumir la plena responsabilidad de todas las actividades y eventos realizados bajo su nombre de usuario. Si el usuario incurre en el uso ilegal de la cuenta o hay una vulnerabilidad de seguridad, la cuenta puede ser suspendida sin previo aviso.</p>
          <p class="title">III. De las recargas de boletos y las reglas</p>
          <p class="containe3"><span class="number">1.</span>Después de que el usuario se convierta en miembro de 1PESO.MX, el usuario puede recargar la cantidad de boletos que ellos deseen en su cuenta. Cada boleto tiene un precio unitario de $1.00 MXN.</p>
          <p class="containe3"><span class="number">2.</span>El saldo de la cuenta está limitado a la plataforma 1PESO.MX y no se puede usar para comprar o canjear otros productos del sitio web ni transferirlo a otros usuarios.</p>
          <p class="title">IV. De los derechos y las obligaciones de usuarios</p>
          <p class="containe3"><span class="number">1.</span>Los usuarios tienen el derecho de propiedad y dominio de su nombre de usuario y contraseña en 1PESO.MX, así como a utilizar el nombre de usuario y contraseña para acceder 1PESO.MX y participar en los productos y compra de boletos. Los usuarios no pueden transferir a terceros su cuenta de 1PESO.MX en ninguna forma.</p>
          <p class="containe3"><span class="number">2.</span>Los usuarios tienen derecho a consultar la información de los productos, las reglas y el Aviso de Privacidad de 1PESO.MX en virtud del presente acuerdo.</p>
          <p class="containe3"><span class="number">3.</span>El usuario está obligado a proporcionar información verídica acerca de su identidad en el momento del registro, así como asegurar la validez y autenticidad del contenido, como la dirección de correo electrónico, número de teléfono, dirección, código postal, etc. Con el objetivo de que 1PESO.MX pueda ponerse en contacto con el usuario. Al mismo tiempo, el usuario también está obligado a actualizar los datos de registro relevantes cuando estos cambien.</p>
          <p class="containe3"><span class="number">4.</span>Los usuarios no pueden registrarse y participar en el los productos con la información de otras personas en 1PESO.MX.</p>
          <p class="containe3"><span class="number">5.</span>Los usuarios deben garantizar que se cumplan los principios de honestidad y credibilidad al participar en 1PESO.MX, así como no perturbar el orden normal de las transacciones en línea.</p>
          <p class="containe3"><span class="number">6.</span>Se requiere que el usuario confirme la información de contacto después de haber ganado uno de los productos de 1PESO.MX, si por errores provocados por el mismo usuario nuestro personal de servicio al cliente no puede ponerse en contacto con él, ​​1PESO.MX no asume responsabilidad alguna.</p>
          <p class="title">V. De los derechos y las obligaciones de 1PESO.MX</p>
          <p class="containe3"><span class="number">1.</span>1PESO.MX está obligado a mantener el funcionamiento normal la plataforma y esforzarse para así permitir a los usuarios participar sin ningún tipo de complicaciones.</p>
          <p class="containe3"><span class="number">2.</span>El personal de atención al cliente de 1PESO.MX responderá de manera oportuna a los problemas relacionados con la transacción, registro y uso de la plataforma 1PESO.MX.</p>
          <p class="containe3"><span class="number">3.</span>En caso de que el usuario incurra en alguna de las siguientes conductas dentro de la plataforma, 1PESO.MX tiene el derecho de suspender su cuenta, eliminar la información relacionada, finalizar el servicio, etc., sin obtener el consentimiento del usuario:</p>
          <p class="containe4"><span class="letter">a.</span>Cuando el usuario haya falsificado información en el momento del registro información de registro o con respecto a tarjetas de crédito u otras formas de pago.</p>
          <p class="containe4"><span class="letter">b.</span>Si el usuario infringe las disposiciones de este acuerdo o viola las leyes y regulaciones locales.</p>
          <p class="containe3"><span class="number">4.</span>Para los productos de la plataforma, 1PESO.MX se reserva el derecho de modificar el precio del producto de acuerdo con los cambios del mercado sin previo aviso a los clientes.</p>
          <p class="containe3"><span class="number">5.</span>Si se dan las siguientes condiciones, 1PESO.MX se reserva el derecho de cancelar el envío del producto al usuario:</p>
          <p class="containe4"><span class="letter">a.</span>Por causas de fuerza mayor, falla del sistema de red, ataques de terceros u otras situaciones más allá del control de 1PESO.MX.</p>
          <p class="containe4"><span class="letter">b.</span>Después de que 1PESO.MX haya cancelado el envío, el usuario puede solicitar el reembolso del importe en su cuenta. El importe se reembolsará a la cuenta del usuario dentro de los siguientes 3 días hábiles.</p>
          <p class="containe3"><span class="number">6.</span>Los productos que no logren vender la cantidad predeterminada de boletos dentro de 30 días serán finalizados. Una vez finalizado el producto se reembolsarán en su totalidad los boletos con lo que el usuario haya participado dentro de 3 días hábiles.</p>



          <p class="title">VI. De la entrega de Productos y los costos</p>
          <p class="containe3"><span class="number">1.</span>1PESO.MX absorberá los gastos generados por los servicios de paquetería necesarios para realizar la entrega del producto tomando en cuenta lo siguiente:</p>
          <p class="containe4"><span class="letter">a.</span>1PESO.MX únicamente brinda servicios dentro del territorio de los Estados Unidos Mexicanos.</p>
          <p class="containe4"><span class="letter">b.</span>Si el servicio de paquetería no puede entregar el producto a la dirección provista por el ganador, éste será entregado al punto de recolección más cercano de manera predeterminada y el ganador mismo tendrá que recolectarlo.</p>
          <p class="containe3"><span class="number">2.</span>El usuario deberá completar con veracidad los campos de registro con nombre, número de teléfono y domicilio para asegurarse de que nuestro personal de atención al cliente pueda contactarlo al momento de resultar ganador.</p>
          <p class="containe3"><span class="number">3.</span>Si los productos no se pueden entregar debido a las siguientes condiciones 1PESO.MX no será responsable:</p>
          <p class="containe4"><span class="letter">1)</span>Cuando el usuario proporcione información falsa o incorrecta: incluye teléfono, dirección y código postal.</p>
          <p class="containe4"><span class="letter">2)</span>Cuando el personal de servicio al cliente no pueda contactar al usuario debido a razones provocadas por él mismo.</p>
          <p class="containe4"><span class="letter">3)</span>Causas de fuerza mayor, tales como: desastres naturales, guerras repentinas, etc.</p>

          <p class="title">VII. Del límite de la responsabilidad</p>
          <p class="containe2">En la medida permitida por las leyes y regulaciones, cualquier daño o pérdida económica que surja del uso de la plataforma 1PESO.MX, tal como la adquisición de boletos en la misma, generará ningún tipo de responsabilidad para 1PESO.MX</p>
          <p class="containe2">Estos límites de responsabilidad se aplicarán en la medida permitida por la ley y continuarán siendo válidos después de que la cuenta del usuario sea revocada o cancelada.</p>
          <p class="title">VIII. De la ley y aplicación</p>
          <p class="containe3"><span class="number">1.</span>El establecimiento, la implementación y la interpretación de este acuerdo y la resolución de disputas se regirán por las leyes de los Estados Unidos Mexicanos.</p>
          <p class="containe3"><span class="number">2.</span>En caso de que los términos del servicio del sitio entren en conflicto con la ley mexicana, estos términos serán reinterpretados completamente de acuerdo con la ley, mientras que otros términos legales seguirán teniendo efecto legal e influencia en los usuarios.</p>
          <p class="containe3"><span class="number">3.</span>Las disposiciones de este acuerdo son divisibles. Si se determina que alguna disposición de este acuerdo es inválida o inaplicable, dicha disposición puede ser eliminada y las disposiciones restantes se aplicarán.</p>
          <p class="containe3"><span class="number">4.</span>En caso de cualquier disputa entre las partes sobre el contenido de este acuerdo o su implementación, ambas partes harán sus mejores esfuerzos para resolver el asunto mediante negociaciones amistosas. Cuando no se llega a un acuerdo entre las partes, cualquiera de las partes puede entablar una demanda en el tribunal competente del sitio donde se encuentra 1PESO.MX.</p>

        </div>
      </scroll>
    </div>
      <p class="bottom">E-mail：servicio@1peso.com.mx</p>
  </div>
</template>

<script>
  import scroll from '@/components/scroll/scroll'
  export default {
    data () {
      return {
        listenScroll: true
      }
    },
    methods: {
      backUserCenter () {
        this.$router.back()
      }
    },
    components: {
      scroll
    }
  }
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/colorreset"
  @import "../../common/stylus/fontsize"
  @import "../../common/stylus/marginAndsize"
  .userlus
    min-height:100vh
    background:$color-bgcolor
    color:$color-general-font
    position:absolute
    width:100%
    .titles
      font-size:$font-meta
      height:$meta-height
      line-height:$meta-height
      position:fixed
      width:100%
      background:$color-white
      color: $color-general-font
      z-index:100
      border-bottom:1px solid $color-border
      .titlecontainer
        display:flex
        justify-content:space-between
        align-items:center
        margin:auto 0.2rem
        .left
          position:absolute
          padding:0 0.3rem 0 0.25rem
          left:0
          font-size:0.4rem
          color:$color-meta
        p
          text-align:center
          width:100%
    .userrluscon
      padding-top:0.9rem
      background:#fff
      padding-bottom:1.5rem
      // width:100%
      color:#333
      .userrluscontainer
        margin:auto 0.2rem
        height:10rem
        .title1
          font-size:0.3rem
          font-weight: bold
          padding-top:0.25rem
        .title
          font-size:0.25rem
          font-weight: bold
        .containe1
          font-size:0.24rem
          margin-top:0.3rem
          line-height:0.3rem
          // margin-bottom:0.3rem
        .containe2
          font-size:0.24rem
          margin-top:0.4rem
          margin-bottom:0.3rem
          line-height:0.3rem
          .email
            color:$color-sky-blue
        .containe3
          font-size:0.3rem
          font-size:0.24rem
          line-height:0.3rem
          margin-top:0.2rem
          // display:flex
          // align-items:center
          margin-left:0.4rem
          position: relative
          margin-bottom:0.2rem
          .dot
            display:inline-block
            position:absolute
            width:0.1rem
            height:0.1rem
            background:#333
            border-radius:100%
            vertical-align:middle
            margin-right:0.1rem
            left:-0.2rem
            top:0.1rem
          .number
            display:inline-block
            position:absolute
            border-radius:100%
            vertical-align:middle
            margin-right:0.1rem
            left:-0.2rem
        .containe4
          font-size:0.3rem
          font-size:0.24rem
          line-height:0.3rem
          margin-top:0.2rem
          // display:flex
          // align-items:center
          margin-left:0.7rem
          position: relative
          margin-bottom:0.2rem
          .letter
            display:inline-block
            position:absolute
            border-radius:100%
            vertical-align:middle
            margin-right:0.1rem
            left:-0.3rem
    .bottom
      position:absolute
      font-size:0.24rem
      text-align:center
      width:100%
      color:$color-weaken-font
      background:$color-bgcolor
      height:1rem
      line-height:1rem
      bottom:0
</style>

