<?php
require_once( 'fpdf.php' );
require_once( 'fpdi/autoload.php' );

class CreatePDFFromTamplate {
	private $pdf = null;


	public function __construct() {
		$this->pdf = new \setasign\Fpdi\Fpdi();
		$this->pdf->AddPage();
	}

	public function createPDFFromTamplate( $date ) {
		try {
			$this->pdf->setSourceFile( 'Vorlage.pdf' );
			$tplIdx = $this->pdf->importPage( 1 );
			$this->pdf->useTemplate( $tplIdx, 0, 0, 297, 210, true );

			$this->pdf->SetFont( 'Arial', '', 10 );
			$this->pdf->SetTextColor( 0, 0, 0 );

			foreach ( $date as $key => $value ) {
				switch ( $key ) {
					//***Kind***
					case "vornameKind"://Vorname
						$this->setXYText( 90, 77, $value );
						break;
					case "nameKind"://Nachname
						$this->setXYText( 90, 82, $value );
						break;
					case "dateKind"://Geburtsdatum
						$this->setXYText( 90, 87, $value );
						break;
					case "geburstortKind":
						$this->setXYText( 90, 92, $value );
						break;
					//*** NamesTag
					case "dateNamestag"://Tag
						$this->setXYText( 85, 105, $value );
						break;
					case "feiertagNamestag":// Beschreibung
						$this->findMiddleForText( $value );// von 55 bis 140 pixel
						break;
					case "sacramenteSpendete":
						$this->setXYText(200, 168.5 , trim($value));
						break;
//*** Vater von Taufkind ***
					case "vornameVater":
						$this->pringIfExist(90, 123,$value );
						break;
					case "nameVater":
						$this->pringIfExist( 90, 128, $value );
						break;
					case "dateVater":
						$this->pringIfExist( 90, 133, $value );
						break;
					case "geburstortVater":
						$this->pringIfExist( 90, 138, $value );
						break;

//*** Mutter von Taufkind ***
					case "vornameMutter":
						$this->pringIfExist( 90, 153, $value );
						break;
					case "nameMutter":
						$this->pringIfExist( 90, 158, $value );
						break;
					case "dateMutter":
						$this->pringIfExist( 90, 163, $value );
						break;
					case "geburstortMutter":
						$this->pringIfExist( 90, 168, $value );
						break;
//*** Taufpate ***
					case "vornameTaufpate":
						$this->pringIfExist( 190, 51, $value );
						break;
					case "nameTaufpate":
						$this->pringIfExist( 190, 56, $value );
						break;
					case "dateTaufpate":
						$this->pringIfExist( 190, 61, $value );
						break;
					case "geburstortTaufpate":
						$this->pringIfExist( 190, 66, $value );
						break;
//*** Taufpatin ***
					case "vornameTaufpatin":
						$this->pringIfExist( 190, 82, $value );
						break;
					case "nameTaufpatin":
						$this->pringIfExist( 190, 87, $value );
						break;
					case "dateTaufpatin":
						$this->pringIfExist( 190, 92, $value );
						break;
					case "geburstortTaufpatin":
						$this->pringIfExist( 190, 97, $value );
						break;

					default:
						;
				}
			}

			//*** Datum ***
			$this->pdf->SetXY( 170, 164 );
			$this->pdf->Write( 0, '21.01.2023' );


			//*** Register Nummer ***
			$this->pdf->SetFont( 'Arial', 'B', 14 );
			$this->pdf->SetXY( 201, 137.3 );
			$this->pdf->Write( 0, $date["sacramenteRegNummer"] );


		} catch
		( \setasign\Fpdi\PdfParser\PdfParserException|\setasign\Fpdi\PdfReader\PdfReaderException $e ) {
		}

		$this->pdf->Output();
	}


	/**
	 * @return void
	 */
	public function setXYText( $x, $y, $text ): void {
		$this->pdf->SetXY( $x, $y );
		$this->pdf->Write( 0, $text );
	}

	private function findMiddleForText( mixed $value ) {

		$valueLength = strlen( $value );
		$boxMiddle   = 81;
		if ( $valueLength > 50 ) {
			$lineONe = $this->getSplit( $value );
			$lineTwo = substr( $value, strlen( $lineONe ) );
			$this->setXYText( 55, 110, $lineONe );
			$this->setXYText( 55, 114, trim( $lineTwo ) );

		} else {
			$x = $boxMiddle - $valueLength / 2;
			$this->setXYText( $x, 110, $value );
		}

	}

	public function getSplit( $value ): mixed {
		$line      = "";
		$str_split = preg_split( '/\s+/', $value );
		foreach ( $str_split as $word ) {
			if ( strlen( $line ) < 45 ) {
				$line = $line . "" . $word . " ";
			} else {
				return $line;
			}
		}

		return 0;
	}

	/**
	 * @param mixed $value
	 *
	 * @return void
	 */
	public function pringIfExist( $x, $y, $value ): void {
		if ( $value != '' ) {
			$this->setXYText( $x, $y, $value );
		} else {
			$this->setXYText( $x, $y, "--" );

		}
	}
}