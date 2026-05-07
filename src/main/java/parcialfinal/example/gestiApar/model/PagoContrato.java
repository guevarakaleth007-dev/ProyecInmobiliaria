package parcialfinal.example.gestiApar.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "PAGOCONTRATO")
public class PagoContrato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDPAGOCONTRATO")
    private Long id;

    @Column(name = "IDCONTRATO", nullable = false)
    private Long idContrato;

    @Column(name = "IDFORMAPAGO", nullable = false)
    private Long idFormaPago;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Column(name = "FECHAPAGO", nullable = false)
    private LocalDateTime fechaPago;

    @Column(name = "VALOR", nullable = false, precision = 12, scale = 2)
    private BigDecimal valor;

    public PagoContrato() {}
}
