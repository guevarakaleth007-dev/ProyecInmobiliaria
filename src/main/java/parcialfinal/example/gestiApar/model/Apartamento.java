package parcialfinal.example.gestiApar.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "APARTAMENTO")
public class Apartamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "IDAPARTAMENTO")
    private Long id;

    @Column(name = "IDPROPIETARIO", nullable = false)
    private Long idPropietario;

    @Column(name = "IDCIUDAD", nullable = false)
    private Long idCiudad;

    @Column(name = "DIRECCION", nullable = false, length = 30)
    private String direccion;

    @Column(name = "NUMEROHABITACIONES", nullable = false)
    private Integer numeroHabitacion;

    @Column(name = "ESTADO", nullable = false)
    private Boolean estado;

    @Column(name = "PAGOMENSUAL", nullable = false, precision = 12, scale = 2)
    private BigDecimal pagoMensual;

    // Columna existente en BD, no se usa en la app pero hay que declararla
    @Column(name = "FECHACREACION", insertable = false, updatable = false)
    private LocalDateTime fechaCreacion;

    public Apartamento() {}
}
